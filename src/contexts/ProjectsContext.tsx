
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/projects';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

type ProjectsContextType = {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { role } = useAuth();

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'projects' 
      }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform snake_case to camelCase
      const transformedData: Project[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        costEstimate: Number(item.cost_estimate),
        savingsEstimate: Number(item.savings_estimate),
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
      
      setProjects(transformedData);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setError(error);
      toast({
        title: 'Error fetching projects',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Transform camelCase to snake_case for database
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          description: project.description,
          cost_estimate: project.costEstimate,
          savings_estimate: project.savingsEstimate
        })
        .select()
        .single();

      if (error) throw error;
      
      // Transform the returned data
      const newProject: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        costEstimate: Number(data.cost_estimate),
        savingsEstimate: Number(data.savings_estimate),
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      
      // Update local state (though the subscription should handle this)
      setProjects([newProject, ...projects]);
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      // Transform camelCase to snake_case for database
      const updateData: any = {};
      if (project.title !== undefined) updateData.title = project.title;
      if (project.description !== undefined) updateData.description = project.description;
      if (project.costEstimate !== undefined) updateData.cost_estimate = project.costEstimate;
      if (project.savingsEstimate !== undefined) updateData.savings_estimate = project.savingsEstimate;
      
      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      
      // Update local state (though the subscription should handle this)
      setProjects(projects.map(p => p.id === id ? { ...p, ...project } : p));
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast({
        title: 'Error updating project',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      
      // Update local state (though the subscription should handle this)
      setProjects(projects.filter(p => p.id !== id));
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error deleting project',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const value = {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
