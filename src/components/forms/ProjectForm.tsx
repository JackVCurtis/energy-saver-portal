
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { ImageIcon, UploadCloud } from 'lucide-react';

interface ProjectFormProps {
  defaultValues?: { 
    title: string; 
    description: string; 
    costEstimate: number; 
    savingsEstimate: number; 
    imageUrl?: string;
  };
  onSubmit: (values: ProjectFormProps['defaultValues']) => void;
  dialogClose: () => void;
}

const ProjectForm = ({ 
  defaultValues = { title: '', description: '', costEstimate: 0, savingsEstimate: 0, imageUrl: '' },
  onSubmit,
  dialogClose
}: ProjectFormProps) => {
  const [formData, setFormData] = useState(defaultValues);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValues.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'costEstimate' || name === 'savingsEstimate' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a preview URL for the selected image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Read the file as a data URL for submission
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target?.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    dialogClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
      
      <div className="space-y-2">
        <Label>Project Image</Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          {previewUrl ? (
            <div className="space-y-2">
              <div className="relative mx-auto w-full h-40 rounded-md overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Project preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button type="button" onClick={triggerFileInput} variant="outline" size="sm">
                Change Image
              </Button>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center py-4 cursor-pointer"
              onClick={triggerFileInput}
            >
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload an image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or WebP (max 5MB)
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
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
