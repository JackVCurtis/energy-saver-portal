import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/CustomInput';
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardDescription, 
  CustomCardContent, 
  CustomCardFooter 
} from '@/components/ui/CustomCard';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // This is a mock signup - in a real app, you would connect to an authentication service
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      
      // Store user role (regular user)
      localStorage.setItem('userRole', 'user');
      navigate('/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <CustomCard>
              <form onSubmit={handleSignup}>
                <CustomCardHeader>
                  <CustomCardTitle className="text-2xl">Create an account</CustomCardTitle>
                  <CustomCardDescription>
                    Sign up to start saving on energy costs
                  </CustomCardDescription>
                </CustomCardHeader>
                
                <CustomCardContent className="space-y-4">
                  <CustomInput
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User className="h-4 w-4" />}
                  />
                  
                  <CustomInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                  />
                  
                  <div className="relative">
                    <CustomInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="h-4 w-4" />}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-[32px]"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <CustomInput
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                  />
                </CustomCardContent>
                
                <CustomCardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </div>
                </CustomCardFooter>
              </form>
            </CustomCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
