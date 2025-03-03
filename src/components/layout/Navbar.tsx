
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, FolderKanban, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban className="h-4 w-4 mr-2" /> },
  ];

  const authItems = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup', highlight: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-morphism py-2 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl font-semibold text-energy-blue">EnergyCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className={`px-3 py-2 rounded-md flex items-center transition-all-300 ${
                      isActive(item.path) 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-primary/5'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center pl-6 ml-6 border-l">
              {authItems.map((item) => (
                item.highlight ? (
                  <Button 
                    key={item.name} 
                    asChild
                    className="ml-2"
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </Button>
                ) : (
                  <Button 
                    key={item.name} 
                    variant="ghost" 
                    asChild
                    className="ml-2"
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </Button>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-3 rounded-md text-base font-medium flex items-center ${
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-primary/5'
                }`}
                onClick={closeMobileMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 px-2">
                {authItems.map((item) => (
                  item.highlight ? (
                    <Button 
                      key={item.name} 
                      asChild
                      className="w-full"
                    >
                      <Link to={item.path} onClick={closeMobileMenu}>{item.name}</Link>
                    </Button>
                  ) : (
                    <Button 
                      key={item.name} 
                      variant="outline" 
                      asChild
                      className="w-full"
                    >
                      <Link to={item.path} onClick={closeMobileMenu}>{item.name}</Link>
                    </Button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
