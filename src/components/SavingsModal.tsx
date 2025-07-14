import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

interface SavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "quick" | "safe" | "grow" | "custom";
}

const SavingsModal = ({ isOpen, onClose, type }: SavingsModalProps) => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<number[]>([30]);
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
    const [selectedDuration] = duration;
    
    // Trigger confetti animation
    const confettiEvent = () => {
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
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
    setDuration([config.defaultDuration]);
    setGoalName("");
    setTargetAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-stashbox-cream border-none rounded-stashbox">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-stashbox-text">
            {config.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {type === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium text-stashbox-text">
                Goal Name
              </Label>
              <Input
                id="goalName"
                placeholder="e.g., PS5"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="rounded-stashbox border-stashbox-text/20"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-stashbox-text">
              {type === "custom" ? "Target Amount ($)" : "Enter Amount ($)"}
            </Label>
            <Input
              id="amount"
              placeholder={config.placeholder}
              value={type === "custom" ? targetAmount : amount}
              onChange={(e) => type === "custom" ? setTargetAmount(e.target.value) : setAmount(e.target.value)}
              className="rounded-stashbox border-stashbox-text/20"
            />
          </div>
          
          <div className="space-y-4">
            <Label className="text-sm font-medium text-stashbox-text">
              Duration ({duration[0]} days)
            </Label>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={config.maxDuration}
              min={config.minDuration}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-stashbox-text/60">
              <span>{config.minDuration} days</span>
              <span>{config.maxDuration} days</span>
            </div>
          </div>
          
          <Button
            onClick={handleDeposit}
            className="w-full bg-stashbox-mint text-stashbox-text hover:bg-stashbox-mint/90 font-medium py-3 rounded-stashbox transition-all duration-200 transform hover:scale-105"
          >
            {type === "custom" ? "Create Jar" : "Deposit to Jar"}
          </Button>
          
          {config.penalty && (
            <p className="text-xs text-stashbox-text/60 text-center">
              ⚠️ Early withdrawal penalty: {config.penalty}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;