import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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

  const getModalConfig = () => {
    switch (type) {
      case "quick":
        return {
          title: "Start QuickSave",
          minDuration: 30,
          maxDuration: 365,
          defaultDuration: 30,
          penalty: "1%",
          placeholder: "e.g., 25"
        };
      case "safe":
        return {
          title: "Start SafeStack",
          minDuration: 60,
          maxDuration: 365,
          defaultDuration: 90,
          penalty: "2%",
          placeholder: "e.g., 50"
        };
      case "grow":
        return {
          title: "Start GrowFund",
          minDuration: 180,
          maxDuration: 730,
          defaultDuration: 180,
          penalty: "3%",
          placeholder: "e.g., 100"
        };
      case "custom":
        return {
          title: "Create Goal Jar",
          minDuration: 30,
          maxDuration: 365,
          defaultDuration: 90,
          penalty: null,
          placeholder: "e.g., 500"
        };
      default:
        return {
          title: "Start Saving",
          minDuration: 30,
          maxDuration: 365,
          defaultDuration: 30,
          penalty: "1%",
          placeholder: "e.g., 25"
        };
    }
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