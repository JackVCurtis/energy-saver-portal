import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, LightbulbOff, Zap, TrendingDown } from 'lucide-react';
import { CustomCard, CustomCardContent } from '@/components/ui/CustomCard';
import CostCalculator from '@/components/calculator/CostCalculator';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Link } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Energy Analysis',
      description: 'Detailed breakdown of your current energy usage and costs',
      icon: <Zap className="h-6 w-6 text-energy-blue" />,
    },
    {
      title: 'Smart Recommendations',
      description: "Personalized recommendations based on your home's energy profile",
      icon: <LightbulbOff className="h-6 w-6 text-energy-teal" />,
    },
    {
      title: 'Cost Savings',
      description: 'Calculate estimated savings from energy efficiency improvements',
      icon: <TrendingDown className="h-6 w-6 text-energy-green" />
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="pt-24 lg:pt-32 pb-16 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <motion.div 
                className="mb-12 lg:mb-0 lg:max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.span 
                  className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Save energy, save money
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Reduce your home energy costs <span className="text-energy-blue">effortlessly</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-muted-foreground mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Calculate your potential savings and discover personalized projects that will improve your home's energy efficiency and reduce your bills.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link to="/projects">
                      Browse Projects
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="lg:w-[600px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CostCalculator />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-energy-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Our calculator helps you understand your energy usage and provides tailored recommendations to improve efficiency
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CustomCard className="h-full">
                    <CustomCardContent className="pt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CustomCardContent>
                  </CustomCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
