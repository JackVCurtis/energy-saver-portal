
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Flame, 
  ThermometerSun, 
  Wind, 
  DollarSign, 
  ArrowRight, 
  Info,
  Lightbulb
} from 'lucide-react';
import { CustomInput } from '@/components/ui/CustomInput';
import { Button } from '@/components/ui/button';
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardDescription, 
  CustomCardContent, 
  CustomCardFooter 
} from '@/components/ui/CustomCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface EnergyData {
  electricBill: string;
  gasBill: string;
  oilBill: string;
  heatingSystem: string;
  coolingSystem: string;
}

const initialData: EnergyData = {
  electricBill: '',
  gasBill: '',
  oilBill: '',
  heatingSystem: 'gas',
  coolingSystem: 'central',
};

const iconProps = { 
  className: "h-5 w-5",
  strokeWidth: 1.5 
};

const CostCalculator = () => {
  const [formData, setFormData] = useState<EnergyData>(initialData);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [savingsEstimate, setSavingsEstimate] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // Calculate potential savings based on inputs
    // Simple demo calculation (in a real app this would be more sophisticated)
    const electricCost = parseFloat(formData.electricBill) || 0;
    const gasCost = parseFloat(formData.gasBill) || 0;
    const oilCost = parseFloat(formData.oilBill) || 0;
    
    // Calculate savings based on 20-30% reduction
    const totalCost = electricCost + gasCost + oilCost;
    const savings = Math.round(totalCost * 0.25); // 25% average savings
    
    setSavingsEstimate(savings);
    setCalculationComplete(true);
  };

  const handleReset = () => {
    setFormData(initialData);
    setCalculationComplete(false);
  };

  const handleSignUpPrompt = () => {
    navigate('/signup');
  };

  const systems = {
    heating: [
      { value: 'gas', label: 'Gas furnace' },
      { value: 'electric', label: 'Electric furnace' },
      { value: 'heat_pump', label: 'Heat pump' },
      { value: 'oil', label: 'Oil furnace' },
      { value: 'wood', label: 'Wood/Pellet stove' },
    ],
    cooling: [
      { value: 'central', label: 'Central AC' },
      { value: 'window', label: 'Window units' },
      { value: 'ductless', label: 'Ductless mini-split' },
      { value: 'evaporative', label: 'Evaporative cooler' },
      { value: 'none', label: 'No cooling system' },
    ]
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <CustomCard className="w-full max-w-3xl mx-auto bg-white">
      <CustomCardHeader className="bg-primary/5 border-b">
        <CustomCardTitle className="text-2xl flex items-center">
          <Lightbulb className="mr-2 text-primary" />
          Home Energy Calculator
        </CustomCardTitle>
        <CustomCardDescription>
          Calculate your potential energy savings by entering your current costs
        </CustomCardDescription>
      </CustomCardHeader>

      <CustomCardContent className="pt-6">
        {!calculationComplete ? (
          <motion.div 
            className="space-y-5"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Electricity */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-energy-blue" />
                  Monthly Electricity
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter your average monthly electricity bill</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CustomInput
                name="electricBill"
                type="number"
                value={formData.electricBill}
                onChange={handleInputChange}
                placeholder="Enter amount"
                icon={<DollarSign {...iconProps} />}
                className="w-full"
              />
            </motion.div>

            {/* Gas */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Flame className="mr-2 h-4 w-4 text-energy-teal" />
                  Monthly Gas
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter your average monthly gas bill</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CustomInput
                name="gasBill"
                type="number"
                value={formData.gasBill}
                onChange={handleInputChange}
                placeholder="Enter amount"
                icon={<DollarSign {...iconProps} />}
                className="w-full"
              />
            </motion.div>

            {/* Oil */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Flame className="mr-2 h-4 w-4 text-energy-green" />
                  Monthly Oil
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter your average monthly oil costs (if applicable)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CustomInput
                name="oilBill"
                type="number"
                value={formData.oilBill}
                onChange={handleInputChange}
                placeholder="Enter amount"
                icon={<DollarSign {...iconProps} />}
                className="w-full"
              />
            </motion.div>

            {/* Heating System */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <ThermometerSun className="mr-2 h-4 w-4" />
                  Heating System
                </h3>
              </div>
              <Select 
                value={formData.heatingSystem}
                onValueChange={(value) => handleSelectChange('heatingSystem', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select heating system" />
                </SelectTrigger>
                <SelectContent>
                  {systems.heating.map((system) => (
                    <SelectItem key={system.value} value={system.value}>
                      {system.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Cooling System */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Wind className="mr-2 h-4 w-4" />
                  Cooling System
                </h3>
              </div>
              <Select 
                value={formData.coolingSystem}
                onValueChange={(value) => handleSelectChange('coolingSystem', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select cooling system" />
                </SelectTrigger>
                <SelectContent>
                  {systems.cooling.map((system) => (
                    <SelectItem key={system.value} value={system.value}>
                      {system.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Your Estimated Savings</h3>
              <div className="flex justify-center items-center mb-6">
                <div className="text-5xl font-bold text-energy-green flex items-center my-6">
                  <DollarSign className="h-8 w-8" />
                  <span>{savingsEstimate}</span>
                  <span className="text-base font-normal text-gray-500 ml-2">per month</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-8">
                Based on your inputs, you could save approximately ${savingsEstimate} per month with 
                energy-efficient upgrades and improvements.
              </p>
            </motion.div>
            
            <div className="flex flex-col items-center space-y-3">
              <Button 
                className="w-full max-w-sm"
                onClick={handleSignUpPrompt}
              >
                Sign up to see recommended projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={handleReset}
              >
                Calculate again
              </Button>
            </div>
          </motion.div>
        )}
      </CustomCardContent>

      {!calculationComplete && (
        <CustomCardFooter className="flex justify-end border-t pt-4">
          <Button onClick={handleCalculate}>
            Calculate Savings
          </Button>
        </CustomCardFooter>
      )}
    </CustomCard>
  );
};

export default CostCalculator;
