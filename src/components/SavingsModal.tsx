import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { SAVINGS_JARS } from "@/constants";
import { Copy, Share2, Target, Leaf, TrendingUp, Users, ArrowLeft, X, Clock, Calendar } from "lucide-react";

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
          title: "🪄 Create Your Jar",
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

  const getRiskEmoji = (level: number) => {
    const emojis = ['😌', '🙂', '😐', '😬', '😰'];
    return emojis[level - 1] || '😐';
  };

  const getDurationEmoji = (days: number) => {
    if (days <= 30) return '⚡';
    if (days <= 90) return '🌙';
    if (days <= 180) return '🌟';
    return '🏆';
  };

  const getDurationLabel = (days: number) => {
    if (days <= 30) return 'Sprint';
    if (days <= 90) return 'Marathon';
    if (days <= 180) return 'Journey';
    return 'Legacy';
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
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto bg-white border-none rounded-[24px] animate-slide-up shadow-2xl">
        <DialogHeader className="relative pb-4">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute -right-2 -top-2 h-8 w-8 p-0 text-gray-400 hover:bg-gray-100 rounded-full z-50"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2 pr-8">
            <span>{config.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          {type === "custom" && (
            <>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  What are you saving for?
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg">🎯</span>
                  <Input
                    placeholder="e.g., PS5, Rent, Travel Fund"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="pl-12 h-12 rounded-[20px] border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 text-base font-medium focus:border-stashbox-mint focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  How much do you need?
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold text-green-600">$</span>
                  <Input
                    placeholder="500"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="pl-12 h-12 rounded-[20px] border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 text-base font-medium focus:border-stashbox-mint focus:bg-white transition-all"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Select Duration
                </Label>
                
                <div className="bg-gray-50 rounded-[20px] p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getDurationEmoji(duration)}</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{getDurationLabel(duration)}</div>
                        <div className="text-xs text-gray-500">{duration} days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{duration}</div>
                      <div className="text-xs text-gray-500">days</div>
                    </div>
                  </div>
                  
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    max={365}
                    min={30}
                    step={30}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>30 days</span>
                    <span>365 days</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Growth Strategy
                </Label>
                
                <div className="bg-gray-50 rounded-[20px] p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌱</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Risk Level {riskLevel}</div>
                        <div className="text-xs text-gray-500">{getRiskEmoji(riskLevel)} {riskLevel === 1 ? 'Conservative' : riskLevel === 5 ? 'Aggressive' : 'Moderate'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{(3 + riskLevel * 1.5).toFixed(1)}%</div>
                      <div className="text-xs text-gray-500">Expected APY</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                    </div>
                    
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none"
                      style={{ left: `${(riskLevel - 1) * 25}%` }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
                        <span className="text-xs">🌱</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <Slider
                      value={[riskLevel]}
                      onValueChange={(value) => setRiskLevel(value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full opacity-0"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      😌 Conservative
                    </span>
                    <span className="flex items-center gap-1">
                      😰 Aggressive
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {type !== "custom" && (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                {t('modal.enterAmount')}
              </Label>
              <Input
                id="amount"
                placeholder={config.placeholder}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10 rounded-[16px] border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 text-sm"
              />
            </div>
          )}
          
          <div className="bg-gray-50 rounded-[20px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Allow friends to contribute
                </Label>
                <p className="text-xs text-gray-500">
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
            className="w-full bg-stashbox-mint text-gray-700 hover:bg-stashbox-mint/90 font-semibold py-3 rounded-[20px] transition-all duration-200 flex items-center justify-center gap-2 text-base h-12"
          >
            <Leaf className="w-4 h-4" />
            {type === "custom" ? (isSharedJar ? "🌿 Create Shared Jar" : "🌿 Create Jar") : "Start Saving"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;
