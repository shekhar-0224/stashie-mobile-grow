import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from 'react-i18next';
import { toast } from "@/hooks/use-toast";
import { Leaf, Users, Trophy, TrendingUp, Shield, Zap } from "lucide-react";

interface JarModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "savings" | "shared" | "betting";
}

const JarModal = ({ isOpen, onClose, type }: JarModalProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(12);
  const [riskLevel, setRiskLevel] = useState(50);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const getModalConfig = () => {
    switch (type) {
      case "savings":
        return {
          title: "🫙 Create Savings Jar",
          description: "Start growing your crypto savings with smart yield strategies",
          icon: <Leaf className="w-6 h-6" />,
          color: "hsl(var(--stashbox-mint))"
        };
      case "shared":
        return {
          title: "👥 Create Shared Jar",
          description: "Save together with friends and family",
          icon: <Users className="w-6 h-6" />,
          color: "hsl(var(--stashbox-blue))"
        };
      case "betting":
        return {
          title: "🏆 Create Betting Jar",
          description: "Create challenges and bet on outcomes",
          icon: <Trophy className="w-6 h-6" />,
          color: "hsl(var(--stashbox-orange))"
        };
      default:
        return {
          title: "Create Jar",
          description: "",
          icon: <Leaf className="w-6 h-6" />,
          color: "hsl(var(--stashbox-mint))"
        };
    }
  };

  const getRiskAPY = (risk: number) => {
    if (risk <= 25) return 3 + (risk / 25) * 2; // 3-5%
    if (risk <= 50) return 5 + ((risk - 25) / 25) * 3; // 5-8%
    if (risk <= 75) return 8 + ((risk - 50) / 25) * 4; // 8-12%
    return 12 + ((risk - 75) / 25) * 8; // 12-20%
  };

  const calculateEstimatedReturn = () => {
    const principal = parseFloat(amount) || 0;
    const apy = type === "savings" ? getRiskAPY(riskLevel) : 7.2;
    const months = duration;
    const monthlyRate = apy / 100 / 12;
    const compoundReturn = principal * Math.pow(1 + monthlyRate, months);
    return compoundReturn - principal;
  };

  const getRiskEmoji = (risk: number) => {
    if (risk <= 25) return "😌"; // Low risk
    if (risk <= 50) return "🙂"; // Medium risk
    if (risk <= 75) return "😐"; // Medium-high risk
    return "😰"; // High risk
  };

  const getRiskLabel = (risk: number) => {
    if (risk <= 25) return "Low Risk";
    if (risk <= 50) return "Medium Risk";
    if (risk <= 75) return "Medium-High Risk";
    return "High Risk";
  };

  const handleGrowJar = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      });
      return;
    }

    // Simulate jar creation
    toast({
      title: "🌱 Jar Created Successfully!",
      description: `Your ${getModalConfig().title.split(' ')[1]} jar is now growing with $${amount}`,
    });

    onClose();
  };

  const config = getModalConfig();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800">
            {config.icon}
            {config.title}
          </DialogTitle>
          <p className="text-sm text-gray-600">{config.description}</p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Jar Type Specific Fields */}
          {type === "savings" && (
            <>
              {/* Risk Level Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Risk Level {getRiskEmoji(riskLevel)}</Label>
                <div className="px-3">
                  <Slider
                    value={[riskLevel]}
                    onValueChange={(value) => setRiskLevel(value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Conservative
                    </span>
                    <span className="font-medium">{getRiskLabel(riskLevel)}</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Aggressive
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Goal Name */}
              <div className="space-y-2">
                <Label htmlFor="goalName" className="text-sm font-medium">Goal Name (Optional)</Label>
                <Input
                  id="goalName"
                  placeholder="e.g., Vacation Fund, Emergency Savings"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>

              {/* Target Amount */}
              <div className="space-y-2">
                <Label htmlFor="targetAmount" className="text-sm font-medium">Target Goal ($)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="1000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
            </>
          )}

          {type === "shared" && (
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium">Shared Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., Family Vacation, Group Gift"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
          )}

          {type === "betting" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="betName" className="text-sm font-medium">Bet Description</Label>
                <Input
                  id="betName"
                  placeholder="e.g., Team X will win the championship"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAmount" className="text-sm font-medium">Total Pot ($)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="500"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Amount to Deposit */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              {type === "betting" ? "Your Bet Amount ($)" : "Initial Deposit ($)"}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Duration Slider */}
          {type !== "betting" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Duration: {duration} months</Label>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                max={60}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Estimated Returns */}
          {type === "savings" && amount && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Estimated Returns</span>
              </div>
              <div className="text-lg font-semibold text-green-600">
                +${calculateEstimatedReturn().toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                APY: {getRiskAPY(riskLevel).toFixed(1)}% • {duration} months
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleGrowJar}
            className="w-full mt-6"
            style={{ backgroundColor: config.color, color: 'white' }}
          >
            <Leaf className="w-4 h-4 mr-2" />
            {type === "betting" ? "Place Bet" : "Let's Stash"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JarModal;