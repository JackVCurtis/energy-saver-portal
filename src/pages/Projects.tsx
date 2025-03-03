import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectsContext';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { Edit, DollarSign, TrendingUp, Plus, Image as ImageIcon } from 'lucide-react';
import ProjectForm from '@/components/forms/ProjectForm';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const { role, user, checkRole } = useAuth();
  const { projects, isLoading, createProject, updateProject } = useProjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    id?: string;
    title: string;
    description: string;
    costEstimate: number;
    savingsEstimate: number;
    imageUrl: string;
  } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const verifyAdminRole = async () => {
      if (!user) return;
      
      try {
        const userRole = await checkRole();
        setIsAdmin(userRole === 'admin');
        console.log('Current user role:', userRole);
      } catch (error) {
        console.error('Error checking role:', error);
        toast({
          title: 'Error',
          description: 'Could not verify administrative privileges',
          variant: 'destructive',
        });
      }
    };
    
    verifyAdminRole();
  }, [user, checkRole, toast]);

  const handleCreateProject = (values: typeof currentProject) => {
    if (!values) return;
    createProject({
      title: values.title,
      description: values.description,
      costEstimate: values.costEstimate,
      savingsEstimate: values.savingsEstimate,
      imageUrl: values.imageUrl
    });
  };

  const handleUpdateProject = (values: typeof currentProject) => {
    if (!values || !currentProject?.id) return;
    updateProject(currentProject.id, {
      title: values.title,
      description: values.description,
      costEstimate: values.costEstimate,
      savingsEstimate: values.savingsEstimate,
      imageUrl: values.imageUrl
    });
  };

  const handleOpenEditDialog = (project: typeof projects[0]) => {
    setCurrentProject({
      id: project.id,
      title: project.title,
      description: project.description,
      costEstimate: project.costEstimate,
      savingsEstimate: project.savingsEstimate,
      imageUrl: project.imageUrl
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentProject(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8 mt-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Energy Savings Projects</h1>
              <p className="text-muted-foreground">
                View all available energy savings projects
              </p>
            </div>
            
            {isAdmin && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setCurrentProject({
                    title: '',
                    description: '',
                    costEstimate: 0,
                    savingsEstimate: 0,
                    imageUrl: ''
                  })}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>
                      {currentProject?.id ? 'Edit Project' : 'Create New Project'}
                    </DialogTitle>
                    <DialogDescription>
                      {currentProject?.id 
                        ? 'Update the project details below.'
                        : 'Fill in the details for your new energy savings project.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {currentProject && (
                    <ProjectForm
                      defaultValues={currentProject}
                      onSubmit={currentProject.id ? handleUpdateProject : handleCreateProject}
                      dialogClose={closeDialog}
                    />
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects available yet.</p>
              {isAdmin && (
                <p className="mt-2">Click "Create New Project" to create the first one.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="h-full flex flex-col">
                  {project.imageUrl ? (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-t-lg">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-grow">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-energy-green" />
                        <span className="text-sm font-medium">Cost:</span>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(project.costEstimate)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-energy-blue" />
                        <span className="text-sm font-medium">Savings:</span>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(project.savingsEstimate)}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4">
                    {isAdmin ? (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleOpenEditDialog(project)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Project
                      </Button>
                    ) : (
                      <div className="w-full text-right text-sm text-muted-foreground">
                        Potential ROI: {project.costEstimate > 0 
                          ? `${((project.savingsEstimate / project.costEstimate) * 100).toFixed(0)}%`
                          : 'N/A'}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default Projects;
