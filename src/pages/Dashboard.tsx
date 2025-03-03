
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Zap, 
  TrendingDown, 
  Home, 
  Settings, 
  FolderKanban, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  CustomCard, 
  CustomCardContent, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardDescription, 
  CustomCardFooter 
} from '@/components/ui/CustomCard';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { BarChart } from '@/components/ui/chart';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem('userRole');
    if (!role) {
      navigate('/login');
      return;
    }
    
    setUserRole(role);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const summaryData = [
    {
      title: 'Monthly Costs',
      value: '$245',
      change: '-15%',
      icon: <Zap className="h-5 w-5 text-energy-blue" />,
      description: 'Current monthly energy costs'
    },
    {
      title: 'Potential Savings',
      value: '$78',
      change: '+32%',
      icon: <TrendingDown className="h-5 w-5 text-energy-green" />,
      description: 'Estimated monthly savings'
    },
    {
      title: 'Home Efficiency',
      value: '72/100',
      change: '+5',
      icon: <Home className="h-5 w-5 text-energy-teal" />,
      description: 'Your energy efficiency score'
    },
  ];

  const recommendedProjects = [
    {
      title: 'Install LED Lighting',
      description: 'Replace incandescent bulbs with energy-efficient LEDs',
      savings: '$15/month',
      cost: '$120',
      difficulty: 'Easy',
      category: 'Lighting'
    },
    {
      title: 'Seal Air Leaks',
      description: 'Seal gaps around windows and doors to prevent heat loss',
      savings: '$23/month',
      cost: '$75',
      difficulty: 'Medium',
      category: 'Insulation'
    },
    {
      title: 'Smart Thermostat',
      description: 'Install a programmable smart thermostat',
      savings: '$42/month',
      cost: '$250',
      difficulty: 'Medium',
      category: 'HVAC'
    },
  ];

  const chartData = [
    {
      name: 'Jan',
      electricity: 140,
      gas: 100,
      oil: 20,
    },
    {
      name: 'Feb',
      electricity: 130,
      gas: 110,
      oil: 25,
    },
    {
      name: 'Mar',
      electricity: 125,
      gas: 90,
      oil: 20,
    },
    {
      name: 'Apr',
      electricity: 110,
      gas: 75,
      oil: 15,
    },
    {
      name: 'May',
      electricity: 90,
      gas: 60,
      oil: 0,
    },
    {
      name: 'Jun',
      electricity: 95,
      gas: 45,
      oil: 0,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold">Your Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your energy usage and discover savings opportunities
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-4 md:mt-0"
              >
                <Button asChild>
                  <a href="/projects">
                    View All Projects
                    <FolderKanban className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {summaryData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CustomCard className="h-full">
                    <CustomCardContent className="flex items-start justify-between p-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-medium text-muted-foreground">{item.title}</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">{item.value}</span>
                          <span className={`text-xs font-medium ${
                            item.change.startsWith('+') ? 'text-green-500' : 'text-blue-500'
                          }`}>
                            {item.change}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="p-2 rounded-full bg-primary/10">
                        {item.icon}
                      </div>
                    </CustomCardContent>
                  </CustomCard>
                </motion.div>
              ))}
            </div>
            
            {/* Energy Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8"
            >
              <CustomCard>
                <CustomCardHeader>
                  <div className="flex items-center justify-between">
                    <CustomCardTitle>Energy Usage History</CustomCardTitle>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Options
                    </Button>
                  </div>
                  <CustomCardDescription>
                    Your monthly energy consumption breakdown
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="h-80">
                    <BarChart 
                      data={chartData}
                      index="name"
                      categories={['electricity', 'gas', 'oil']}
                      colors={['#4C87CA', '#40A798', '#3E9973']}
                      valueFormatter={(value) => `$${value}`}
                      yAxisWidth={60}
                    />
                  </div>
                </CustomCardContent>
              </CustomCard>
            </motion.div>
            
            {/* Recommended Projects */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-xl font-bold">Recommended Projects</h2>
                <p className="text-muted-foreground">
                  Projects tailored to your home that can help reduce energy costs
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                  >
                    <CustomCard className="h-full">
                      <CustomCardHeader>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {project.category}
                          </span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                            {project.difficulty}
                          </span>
                        </div>
                        <CustomCardTitle className="mt-2">{project.title}</CustomCardTitle>
                        <CustomCardDescription>{project.description}</CustomCardDescription>
                      </CustomCardHeader>
                      <CustomCardContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Estimated Cost</p>
                            <p className="text-lg font-bold">{project.cost}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Monthly Savings</p>
                            <p className="text-lg font-bold text-energy-green">{project.savings}</p>
                          </div>
                        </div>
                      </CustomCardContent>
                      <CustomCardFooter className="border-t pt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <a href={`/projects?category=${project.category}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CustomCardFooter>
                    </CustomCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
