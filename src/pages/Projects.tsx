
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Home, 
  Thermometer, 
  Wind, 
  PanelTop, 
  Droplets, 
  Search, 
  SlidersHorizontal, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardDescription, 
  CustomCardContent, 
  CustomCardFooter 
} from '@/components/ui/CustomCard';
import { CustomInput } from '@/components/ui/CustomInput';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cost: string;
  savings: string;
  paybackPeriod: string;
  tags: string[];
};

const CATEGORIES = [
  { 
    id: 'lighting', 
    name: 'Lighting', 
    icon: <Lightbulb className="h-5 w-5" /> 
  },
  { 
    id: 'insulation', 
    name: 'Insulation', 
    icon: <Home className="h-5 w-5" /> 
  },
  { 
    id: 'hvac', 
    name: 'HVAC', 
    icon: <Thermometer className="h-5 w-5" /> 
  },
  { 
    id: 'appliances', 
    name: 'Appliances', 
    icon: <PanelTop className="h-5 w-5" /> 
  },
  { 
    id: 'cooling', 
    name: 'Cooling', 
    icon: <Wind className="h-5 w-5" /> 
  },
  { 
    id: 'water', 
    name: 'Water', 
    icon: <Droplets className="h-5 w-5" /> 
  },
];

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [costFilter, setCostFilter] = useState<string>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Initialize with mock data
  useEffect(() => {
    // Mock projects data
    const mockProjects: Project[] = [
      {
        id: 1,
        title: 'Smart LED Lighting Upgrade',
        description: 'Replace incandescent and CFL bulbs with energy-efficient LEDs that can be controlled remotely.',
        category: 'lighting',
        difficulty: 'Easy',
        cost: '$120-200',
        savings: '$15/month',
        paybackPeriod: '8-14 months',
        tags: ['lighting', 'smart home', 'DIY']
      },
      {
        id: 2,
        title: 'Programmable Thermostat Installation',
        description: 'Install a smart thermostat that learns your schedule and adjusts temperature accordingly.',
        category: 'hvac',
        difficulty: 'Medium',
        cost: '$200-300',
        savings: '$42/month',
        paybackPeriod: '5-7 months',
        tags: ['hvac', 'smart home', 'temperature']
      },
      {
        id: 3,
        title: 'Attic Insulation Upgrade',
        description: 'Add proper insulation to your attic to prevent heat loss during winter and heat gain during summer.',
        category: 'insulation',
        difficulty: 'Hard',
        cost: '$1,500-2,000',
        savings: '$45/month',
        paybackPeriod: '33-44 months',
        tags: ['insulation', 'professional', 'weatherization']
      },
      {
        id: 4,
        title: 'Seal Air Leaks Around Windows',
        description: 'Use weatherstripping and caulk to seal gaps around windows and doors.',
        category: 'insulation',
        difficulty: 'Easy',
        cost: '$50-100',
        savings: '$20/month',
        paybackPeriod: '3-5 months',
        tags: ['insulation', 'DIY', 'weatherization']
      },
      {
        id: 5,
        title: 'Energy Star Appliance Upgrade',
        description: 'Replace old appliances with Energy Star certified models.',
        category: 'appliances',
        difficulty: 'Medium',
        cost: '$500-2,000',
        savings: '$30/month',
        paybackPeriod: '17-67 months',
        tags: ['appliances', 'energy star', 'kitchen']
      },
      {
        id: 6,
        title: 'Install Ceiling Fans',
        description: 'Install ceiling fans to improve air circulation and reduce the need for air conditioning.',
        category: 'cooling',
        difficulty: 'Medium',
        cost: '$150-300',
        savings: '$18/month',
        paybackPeriod: '8-17 months',
        tags: ['cooling', 'DIY', 'summer']
      },
      {
        id: 7,
        title: 'Low-Flow Water Fixtures',
        description: 'Install water-saving showerheads and faucet aerators to reduce hot water usage.',
        category: 'water',
        difficulty: 'Easy',
        cost: '$20-50',
        savings: '$10/month',
        paybackPeriod: '2-5 months',
        tags: ['water', 'DIY', 'bathroom']
      },
      {
        id: 8,
        title: 'Window Film Installation',
        description: 'Apply insulating window film to reduce heat transfer through windows.',
        category: 'insulation',
        difficulty: 'Easy',
        cost: '$25-100',
        savings: '$12/month',
        paybackPeriod: '2-8 months',
        tags: ['insulation', 'DIY', 'windows']
      },
      {
        id: 9,
        title: 'HVAC System Tune-Up',
        description: 'Professional maintenance for your heating and cooling system to improve efficiency.',
        category: 'hvac',
        difficulty: 'Medium',
        cost: '$150-300',
        savings: '$25/month',
        paybackPeriod: '6-12 months',
        tags: ['hvac', 'professional', 'maintenance']
      },
    ];
    
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
    
    // Check for URL parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      const matchingCategory = CATEGORIES.find(
        c => c.name.toLowerCase() === category.toLowerCase()
      );
      if (matchingCategory) {
        setCategoryFilter(matchingCategory.id);
      }
    }
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let results = [...projects];
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(project => project.category === categoryFilter);
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      results = results.filter(project => project.difficulty.toLowerCase() === difficultyFilter);
    }
    
    // Apply cost filter
    if (costFilter !== 'all') {
      switch (costFilter) {
        case 'low':
          results = results.filter(project => {
            const cost = parseInt(project.cost.replace(/\$|,|-.*$/g, ''));
            return cost < 100;
          });
          break;
        case 'medium':
          results = results.filter(project => {
            const cost = parseInt(project.cost.replace(/\$|,|-.*$/g, ''));
            return cost >= 100 && cost < 500;
          });
          break;
        case 'high':
          results = results.filter(project => {
            const cost = parseInt(project.cost.replace(/\$|,|-.*$/g, ''));
            return cost >= 500;
          });
          break;
      }
    }
    
    setFilteredProjects(results);
  }, [searchTerm, categoryFilter, difficultyFilter, costFilter, projects]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setDifficultyFilter('all');
    setCostFilter('all');
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.icon : <Lightbulb className="h-5 w-5" />;
  };

  const getCategoryName = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold">Energy Saving Projects</h1>
                <p className="text-muted-foreground">
                  Browse projects to improve your home's energy efficiency
                </p>
              </motion.div>
            </div>
            
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <CustomInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="md:hidden">
                    <Button 
                      variant="outline" 
                      onClick={() => setFiltersOpen(!filtersOpen)}
                      className="w-full"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  <div className="hidden md:flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={costFilter} onValueChange={setCostFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Cost" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Costs</SelectItem>
                        <SelectItem value="low">Low (&lt;$100)</SelectItem>
                        <SelectItem value="medium">Medium ($100-$500)</SelectItem>
                        <SelectItem value="high">High (&gt;$500)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {(categoryFilter !== 'all' || difficultyFilter !== 'all' || costFilter !== 'all') && (
                      <Button variant="ghost" onClick={handleClearFilters} size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Mobile Filters */}
              {filtersOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4 p-4 border rounded-md bg-background"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Difficulty</label>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Difficulties</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Cost</label>
                      <Select value={costFilter} onValueChange={setCostFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Cost" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Costs</SelectItem>
                          <SelectItem value="low">Low (&lt;$100)</SelectItem>
                          <SelectItem value="medium">Medium ($100-$500)</SelectItem>
                          <SelectItem value="high">High (&gt;$500)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => setFiltersOpen(false)} className="flex-1">
                        Apply Filters
                      </Button>
                      
                      {(categoryFilter !== 'all' || difficultyFilter !== 'all' || costFilter !== 'all') && (
                        <Button variant="outline" onClick={handleClearFilters}>
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {/* Category Tabs (Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8 hidden md:block"
            >
              <Tabs defaultValue="all" value={categoryFilter} onValueChange={setCategoryFilter}>
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    All Categories
                  </TabsTrigger>
                  {CATEGORIES.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>
            
            {/* Results */}
            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="text-sm text-muted-foreground mb-6">
                    Showing {filteredProjects.length} projects
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                      >
                        <CustomCard className="h-full">
                          <CustomCardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full bg-primary/10">
                                  {getCategoryIcon(project.category)}
                                </div>
                                <span className="text-xs font-medium">
                                  {getCategoryName(project.category)}
                                </span>
                              </div>
                              <Badge variant={
                                project.difficulty === 'Easy' ? 'outline' : 
                                project.difficulty === 'Medium' ? 'secondary' : 'default'
                              }>
                                {project.difficulty}
                              </Badge>
                            </div>
                            <CustomCardTitle className="text-lg">{project.title}</CustomCardTitle>
                            <CustomCardDescription className="line-clamp-2">
                              {project.description}
                            </CustomCardDescription>
                          </CustomCardHeader>
                          
                          <CustomCardContent className="py-2">
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div>
                                <p className="text-xs text-muted-foreground">Cost</p>
                                <p className="font-medium">{project.cost}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Savings</p>
                                <p className="font-medium text-energy-green">{project.savings}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Payback</p>
                                <p className="font-medium">{project.paybackPeriod}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-1">
                              {project.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="text-xs px-2 py-0.5 bg-muted rounded-full"
                                  onClick={() => setSearchTerm(tag)}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CustomCardContent>
                          
                          <CustomCardFooter className="border-t pt-4">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </CustomCardFooter>
                        </CustomCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-center py-16"
                >
                  <div className="text-lg mb-2">No projects found</div>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search filters
                  </p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
