import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { SAVINGS_JARS } from "@/constants";

interface SavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "quick" | "safe" | "grow" | "custom";
}

const SavingsModal = ({ isOpen, onClose, type }: SavingsModalProps) => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<number>(30);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState(2);

  const getModalConfig = () => {
    switch (type) {
      case "quick":
        return {
          title: "Start QuickSave",
          ...SAVINGS_JARS.QUICK,
          placeholder: "e.g., 25"
        };
      case "safe":
        return {
          title: "Start SafeStack",
          ...SAVINGS_JARS.SAFE,
          placeholder: "e.g., 50"
        };
      case "grow":
        return {
          title: "Start GrowFund",
          ...SAVINGS_JARS.GROW,
          placeholder: "e.g., 100"
        };
      case "custom":
        return {
          title: "Create Goal Jar",
          ...SAVINGS_JARS.CUSTOM,
          placeholder: "e.g., 500"
        };
      default:
        return {
          title: "Start Saving",
          ...SAVINGS_JARS.QUICK,
          placeholder: "e.g., 25"
        };
    }
  };

  const calculateEstimatedReturn = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || inputAmount <= 0) return 0;
    
    const principal = inputAmount;
    const rate = config.apy / 100;
    const time = duration / 365;
    
    const estimatedReturn = principal * (1 + rate * time);
    return estimatedReturn;
  };

  const calculateCustomReturn = () => {
    const inputAmount = parseFloat(targetAmount);
    if (isNaN(inputAmount) || inputAmount <= 0) return 0;
    
    const principal = inputAmount;
    const riskAPY = getRiskAPY();
    const rate = riskAPY / 100;
    const time = duration / 365;
    
    const estimatedReturn = principal * (1 + rate * time);
    return estimatedReturn;
  };

  const getRiskAPY = () => {
    const baseAPY = 3.0;
    const riskMultiplier = riskLevel * 1.5;
    return baseAPY + riskMultiplier;
  };

  const config = getModalConfig();

  const handleDeposit = () => {
    // Trigger confetti animation
    const confettiEvent = () => {
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100]);
      }
      
      // Show success toast with confetti effect
      toast({
        title: "🎉 Saved!",
        description: "Jar topped up. You're 1 step closer to your goal!",
      });
    };

    // Simulate deposit action
    setTimeout(confettiEvent, 300);
    
    // Reset form and close modal
    setAmount("");
    setDuration(config.defaultDuration);
    setGoalName("");
    setTargetAmount("");
    setRiskLevel(2);
    onClose();
  };

  const durationOptions = [30, 90, 180, 365];
  
  const handleDurationChange = (value: number) => {
    setDuration(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-modal border-none rounded-stashbox animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center space-x-2">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie" 
              className="w-6 h-6 animate-bounce-gentle"
            />
            <span>{config.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {type === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium text-white">
                Goal Name
              </Label>
              <Input
                id="goalName"
                placeholder="e.g., PS5"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-white">
              {type === "custom" ? "Target Amount ($)" : "Enter Amount ($)"}
            </Label>
            <Input
              id="amount"
              placeholder={config.placeholder}
              value={type === "custom" ? targetAmount : amount}
              onChange={(e) => type === "custom" ? setTargetAmount(e.target.value) : setAmount(e.target.value)}
              className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
            />
          </div>
          
          {type === "custom" && (
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white">
                Choose Risk Level: {riskLevel} 
                <span className="text-xs text-white/70 ml-2">Higher risk, higher returns</span>
              </Label>
              
              <div className="bg-white/30 rounded-stashbox p-4">
                <Slider
                  value={[riskLevel]}
                  onValueChange={(value) => setRiskLevel(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-stashbox p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm">📊</span>
                  <span className="text-sm font-medium text-white">Expected Return</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: "#F9B572",
                      width: `${riskLevel * 20}%`
                    }}
                  />
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {riskLevel * 20}% potential
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Label className="text-sm font-medium text-white">
              Duration ({duration} days)
            </Label>
            
            {/* Custom Duration Picker */}
            <div className="relative bg-white/30 rounded-stashbox p-4">
              <div className="flex justify-between items-center mb-4">
                {durationOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDurationChange(option)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-stashbox transition-all duration-200 ${
                      duration === option 
                        ? 'bg-stashbox-mint scale-110 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    <img 
                      src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                      alt="Duration option" 
                      className={`w-8 h-8 ${duration === option ? 'animate-sparkle' : ''}`}
                    />
                    <span className="text-xs font-medium text-gray-800">
                      {option}d
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="relative w-full h-2 bg-stashbox-cream rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-stashbox-orange rounded-full transition-all duration-500 animate-fluid-fill"
                  style={{ 
                    width: `${(durationOptions.indexOf(duration) + 1) * 25}%` 
                  }}
                />
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 transition-all duration-500"
                  style={{ 
                    left: `calc(${(durationOptions.indexOf(duration)) * 25}% + ${durationOptions.indexOf(duration) * 6}px)` 
                  }}
                >
                  <img 
                    src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                    alt="Slider handle" 
                    className="w-6 h-6 animate-bounce-gentle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Return Estimator Card */}
          {type !== "custom" && amount && (
            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <h4 className="text-sm font-medium text-white">Estimated Return</h4>
              </div>
              
              <p className="text-xs text-white/80">
                Investing ${amount} for {duration} days at {config.apy}% APY
              </p>
              
              <div className="text-lg font-semibold text-stashbox-mint">
                You'll get ~${calculateEstimatedReturn().toFixed(2)}
              </div>
              
              <p className="text-xs text-white/60">
                Returns are fixed. Early withdrawal incurs penalty of {config.penalty}.
              </p>
            </div>
          )}

          {/* Custom Return Estimator Card */}
          {type === "custom" && targetAmount && (
            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <h4 className="text-sm font-medium text-white">Custom Return Estimate</h4>
              </div>
              
              <p className="text-xs text-white/80">
                At Risk Level {riskLevel}, you could earn ~{getRiskAPY().toFixed(1)}% APY
              </p>
              
              <div className="text-lg font-semibold text-stashbox-mint">
                Est. return on ${targetAmount}: ${calculateCustomReturn().toFixed(2)}
              </div>
            </div>
          )}
          
          <Button
            onClick={handleDeposit}
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-3 rounded-stashbox transition-all duration-200 transform hover:scale-105 animate-bounce-gentle"
          >
            {type === "custom" ? "Create Jar" : "Deposit to Jar"}
          </Button>
          
          {config.penalty && (
            <p className="text-xs text-gray-300 text-center">
              ⚠️ Early withdrawal penalty: {config.penalty}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;