
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';

interface ProjectFormProps {
  defaultValues?: { 
    title: string; 
    description: string; 
    costEstimate: number; 
    savingsEstimate: number; 
  };
  onSubmit: (values: ProjectFormProps['defaultValues']) => void;
  dialogClose: () => void;
}

const ProjectForm = ({ 
  defaultValues = { title: '', description: '', costEstimate: 0, savingsEstimate: 0 },
  onSubmit,
  dialogClose
}: ProjectFormProps) => {
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'costEstimate' || name === 'savingsEstimate' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    dialogClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costEstimate">Cost Estimate ($)</Label>
          <Input
            id="costEstimate"
            name="costEstimate"
            type="number"
            min="0"
            step="0.01"
            value={formData.costEstimate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="savingsEstimate">Savings Estimate ($)</Label>
          <Input
            id="savingsEstimate"
            name="savingsEstimate"
            type="number"
            min="0"
            step="0.01"
            value={formData.savingsEstimate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={dialogClose}>
          Cancel
        </Button>
        <Button type="submit">Save Project</Button>
      </DialogFooter>
    </form>
  );
};

export default ProjectForm;
