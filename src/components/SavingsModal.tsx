
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { SAVINGS_JARS } from "@/constants";
import { Copy, Share2, Target, Leaf, TrendingUp, Users, ArrowLeft, X } from "lucide-react";

interface SavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "quick" | "safe" | "grow" | "custom" | "betting";
}

const SavingsModal = ({ isOpen, onClose, type }: SavingsModalProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<number>(30);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState(2);
  const [isSharedJar, setIsSharedJar] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Betting jar states
  const [betDescription, setBetDescription] = useState("");
  const [winConditions, setWinConditions] = useState("");
  const [inviteList, setInviteList] = useState("");

  const getModalConfig = () => {
    switch (type) {
      case "quick":
        return {
          title: t('modal.startQuickSave'),
          ...SAVINGS_JARS.QUICK,
          placeholder: "e.g., 25"
        };
      case "safe":
        return {
          title: t('modal.startSafeStack'),
          ...SAVINGS_JARS.SAFE,
          placeholder: "e.g., 50"
        };
      case "grow":
        return {
          title: t('modal.startGrowFund'),
          ...SAVINGS_JARS.GROW,
          placeholder: "e.g., 100"
        };
      case "custom":
        return {
          title: "Create Custom Saving Jar",
          ...SAVINGS_JARS.CUSTOM,
          placeholder: "e.g., 500"
        };
      case "betting":
        return {
          title: "Create Betting Jar",
          placeholder: "Enter bet amount",
          color: 'hsl(var(--stashbox-orange))',
          apy: 0,
          penalty: null
        };
      default:
        return {
          title: t('modal.startQuickSave'),
          ...SAVINGS_JARS.QUICK,
          placeholder: "e.g., 25"
        };
    }
  };

  const getRiskData = (level: number) => {
    const riskOptions = [
      { name: 'Conservative', emoji: '🌱', apy: 3.0 },
      { name: 'Moderate', emoji: '😊', apy: 6.0 },
      { name: 'Aggressive', emoji: '🚀', apy: 9.0 }
    ];
    return riskOptions[level - 1] || riskOptions[1];
  };

  const calculateCustomReturn = () => {
    const inputAmount = parseFloat(targetAmount);
    if (isNaN(inputAmount) || inputAmount <= 0) return 0;
    
    const principal = inputAmount;
    const riskData = getRiskData(riskLevel);
    const rate = riskData.apy / 100;
    const time = duration / 365;
    
    const estimatedReturn = principal * (1 + rate * time);
    return estimatedReturn;
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    // Map to 3 levels
    if (percentage < 0.33) {
      setRiskLevel(1);
    } else if (percentage < 0.67) {
      setRiskLevel(2);
    } else {
      setRiskLevel(3);
    }
  };

  const config = getModalConfig();
  const currentRiskData = getRiskData(riskLevel);

  const handleCopyLink = () => {
    const jarName = type === "custom" ? goalName : config.title;
    const jarLink = `https://stashbox.app/jar/${jarName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(jarLink);
    toast({
      title: "Link Copied!",
      description: "Jar link copied to clipboard",
    });
  };

  const handleShare = () => {
    const jarName = type === "custom" ? goalName : config.title;
    const jarLink = `https://stashbox.app/jar/${jarName.toLowerCase().replace(/\s+/g, '-')}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Join my ${jarName} Jar`,
        text: `Help me reach my saving goal!`,
        url: jarLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleDeposit = () => {
    // For saving jars, show share options after creation
    if (type !== "betting" && isSharedJar) {
      setShowShareOptions(true);
      return;
    }

    // Trigger confetti animation
    const confettiEvent = () => {
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100]);
      }
      
      // Show success toast
      toast({
        title: type === "betting" ? "Betting Jar Created!" : t('toast.saved'),
        description: type === "betting" ? "Your betting jar is ready for participants!" : t('toast.savedDescription'),
      });
    };

    setTimeout(confettiEvent, 300);
    
    // Reset form and close modal
    setAmount("");
    setDuration(30);
    setGoalName("");
    setTargetAmount("");
    setRiskLevel(2);
    setIsSharedJar(false);
    setShowShareOptions(false);
    setBetDescription("");
    setWinConditions("");
    setInviteList("");
    onClose();
  };

  const handleBackToForm = () => {
    setShowShareOptions(false);
  };

  // Betting Jar Modal Content
  if (type === "betting") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[350px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
          <DialogHeader className="relative pb-2">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-1 -top-1 h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
            <DialogTitle className="text-base font-semibold text-white flex items-center space-x-2 pr-6">
              <TrendingUp className="w-4 h-4 text-stashbox-orange" />
              <span>{config.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="betDescription" className="text-xs font-medium text-white">
                Define the bet
              </Label>
              <Input
                id="betDescription"
                placeholder="e.g., Who will win the match?"
                value={betDescription}
                onChange={(e) => setBetDescription(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="winConditions" className="text-xs font-medium text-white">
                Set win condition(s)
              </Label>
              <Input
                id="winConditions"
                placeholder="e.g., Team A wins or match ends in draw"
                value={winConditions}
                onChange={(e) => setWinConditions(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inviteList" className="text-xs font-medium text-white">
                Invite people to join
              </Label>
              <Input
                id="inviteList"
                placeholder="Enter email addresses or usernames"
                value={inviteList}
                onChange={(e) => setInviteList(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-2">
              <p className="text-xs text-white/80 leading-relaxed">
                💡 <span className="font-medium">How it works:</span> Funds are pooled together. Manual agreement or consensus closes the bet. Winner receives the full pot.
              </p>
            </div>
            
            <Button
              onClick={handleDeposit}
              className="w-full bg-stashbox-orange text-white hover:bg-stashbox-orange/90 font-medium py-2 rounded-stashbox transition-all duration-200 text-sm h-8"
            >
              Create Betting Jar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Share Options View
  if (showShareOptions) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[350px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
          <DialogHeader className="relative pb-2">
            <Button
              onClick={handleBackToForm}
              variant="ghost"
              size="sm"
              className="absolute -left-1 -top-1 h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
            >
              <ArrowLeft className="h-3 w-3" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-1 -top-1 h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
            <DialogTitle className="text-base font-semibold text-white flex items-center justify-center space-x-2 px-6">
              <span>🎉 Jar Created!</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-1">
            <div className="text-center">
              <p className="text-white/80 text-xs mb-3">
                Your {goalName || config.title} is ready! Share it with others to start collecting contributions.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs h-8"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Link
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs h-8"
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
            </div>
            
            <Button
              onClick={onClose}
              className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox text-xs h-8"
            >
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Main Form View
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[350px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
        <DialogHeader className="relative pb-1">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute -right-1 -top-1 h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full z-50"
          >
            <X className="h-3 w-3" />
          </Button>
          <DialogTitle className="text-base font-semibold text-white flex items-center space-x-2 pr-6">
            <Leaf className="w-4 h-4 text-stashbox-mint" />
            <span>{config.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {type === "custom" && (
            <div className="space-y-1.5">
              <Label htmlFor="goalName" className="text-xs font-medium text-white">
                {t('modal.goalName')}
              </Label>
              <Input
                id="goalName"
                placeholder={t('modal.goalNamePlaceholder')}
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>
          )}
          
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-xs font-medium text-white">
              {type === "custom" ? t('modal.targetAmount') : t('modal.enterAmount')}
            </Label>
            <Input
              id="amount"
              placeholder={config.placeholder}
              value={type === "custom" ? targetAmount : amount}
              onChange={(e) => type === "custom" ? setTargetAmount(e.target.value) : setAmount(e.target.value)}
              className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
            />
          </div>
          
          {type === "custom" && (
            <>
              <div className="space-y-3">
                <Label className="text-xs font-medium text-white flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  Growth Strategy
                </Label>
                
                <div className="bg-white/10 rounded-stashbox p-4 space-y-3">
                  <div className="text-center">
                    <div className="text-lg mb-1">{currentRiskData.emoji}</div>
                    <div className="text-sm font-medium text-white">{currentRiskData.name}</div>
                    <div className="text-xs text-white/70">{currentRiskData.apy.toFixed(1)}% Expected APY</div>
                  </div>
                  
                  <div 
                    className="relative h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full cursor-pointer"
                    onClick={handleSliderClick}
                  >
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${((riskLevel - 1) / 2) * 100}%` }}
                    >
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashbox Logo" 
                          className="w-3 h-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expected Returns Card - only show when amount is filled */}
              {targetAmount && parseFloat(targetAmount) > 0 && (
                <div className="bg-white/10 rounded-stashbox p-3">
                  <div className="text-xs font-medium text-white mb-2">Expected Returns</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-white">
                        ${calculateCustomReturn().toFixed(0)}
                      </div>
                      <div className="text-xs text-white/70">
                        After {duration} days
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-300">
                        +${(calculateCustomReturn() - parseFloat(targetAmount)).toFixed(0)}
                      </div>
                      <div className="text-xs text-white/70">
                        Profit
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="bg-white/10 rounded-stashbox p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-medium text-white flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  Allow friends to contribute
                </Label>
                <p className="text-xs text-white/60">
                  Let others add funds to boost your goal
                </p>
              </div>
              <Switch
                checked={isSharedJar}
                onCheckedChange={setIsSharedJar}
              />
            </div>
          </div>
          
          <Button
            onClick={handleDeposit}
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox transition-all duration-200 flex items-center justify-center gap-2 text-sm h-8"
          >
            <Leaf className="w-3 h-3" />
            {type === "custom" ? (isSharedJar ? "Create Shared Jar" : "Create Jar") : "Start Saving"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;
