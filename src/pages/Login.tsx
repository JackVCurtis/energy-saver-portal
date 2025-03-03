
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
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { useToast } from '@/components/ui/toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // This is a mock login - in a real app, you would connect to an authentication service
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful login for demo purposes
      // For admin access, use admin@example.com / admin123
      if (email === 'admin@example.com' && password === 'admin123') {
        // Admin login
        toast({
          title: "Success",
          description: "Logged in as admin",
        });
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
      } else {
        // Regular user login
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        localStorage.setItem('userRole', 'user');
        navigate('/dashboard');
      }
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
              <form onSubmit={handleLogin}>
                <CustomCardHeader>
                  <CustomCardTitle className="text-2xl">Welcome back</CustomCardTitle>
                  <CustomCardDescription>
                    Sign in to access your account
                  </CustomCardDescription>
                </CustomCardHeader>
                
                <CustomCardContent className="space-y-4">
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
                      placeholder="Enter your password"
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
                  
                  <div className="flex justify-end">
                    <Button variant="link" className="px-0 h-auto font-normal">
                      Forgot password?
                    </Button>
                  </div>
                </CustomCardContent>
                
                <CustomCardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                  
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link 
                      to="/signup" 
                      className="text-primary font-medium hover:underline"
                    >
                      Create account
                    </Link>
                  </div>
                </CustomCardFooter>
              </form>
            </CustomCard>
            
            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>For demo, use:</p>
              <p>Regular user: user@example.com / password</p>
              <p>Admin: admin@example.com / admin123</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
