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

  const getRiskEmoji = (level: number) => {
    const emojis = ['😌', '🙂', '😐', '😬', '😰'];
    return emojis[level - 1] || '😐';
  };

  const getRiskColor = (level: number) => {
    const colors = ['#10B981', '#84CC16', '#F59E0B', '#F97316', '#EF4444'];
    return colors[level - 1] || '#F59E0B';
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
        <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
          <DialogHeader className="relative">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-lg font-semibold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-stashbox-orange" />
              <span>{config.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="betDescription" className="text-sm font-medium text-white">
                Define the bet
              </Label>
              <Input
                id="betDescription"
                placeholder="e.g., Who will win the match?"
                value={betDescription}
                onChange={(e) => setBetDescription(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="winConditions" className="text-sm font-medium text-white">
                Set win condition(s)
              </Label>
              <Input
                id="winConditions"
                placeholder="e.g., Team A wins or match ends in draw"
                value={winConditions}
                onChange={(e) => setWinConditions(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteList" className="text-sm font-medium text-white">
                Invite people to join
              </Label>
              <Input
                id="inviteList"
                placeholder="Enter email addresses or usernames"
                value={inviteList}
                onChange={(e) => setInviteList(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-3">
              <p className="text-xs text-white/80 leading-relaxed">
                💡 <span className="font-medium">How it works:</span> Funds are pooled together. Manual agreement or consensus closes the bet. Winner receives the full pot.
              </p>
            </div>
            
            <Button
              onClick={handleDeposit}
              className="w-full bg-stashbox-orange text-white hover:bg-stashbox-orange/90 font-medium py-2 rounded-stashbox transition-all duration-200"
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
        <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
          <DialogHeader className="relative">
            <Button
              onClick={handleBackToForm}
              variant="ghost"
              size="sm"
              className="absolute -left-2 -top-2 h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-lg font-semibold text-white flex items-center justify-center space-x-2">
              <span>🎉 Jar Created!</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="text-center">
              <p className="text-white/80 text-sm mb-4">
                Your {goalName || config.title} is ready! Share it with others to start collecting contributions.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            <Button
              onClick={onClose}
              className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox"
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
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
        <DialogHeader className="relative">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute -right-2 -top-2 h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-lg font-semibold text-white flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-stashbox-mint" />
            <span>{config.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {type === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium text-white">
                {t('modal.goalName')}
              </Label>
              <Input
                id="goalName"
                placeholder={t('modal.goalNamePlaceholder')}
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-white">
              {type === "custom" ? t('modal.targetAmount') : t('modal.enterAmount')}
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
            <>
              <div className="space-y-4">
                <Label className="text-sm font-medium text-white flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Risk Level: {riskLevel} {getRiskEmoji(riskLevel)}
                </Label>
                
                <div className="bg-white/10 rounded-stashbox p-6 space-y-4">
                  {/* Sleek Risk Meter */}
                  <div className="relative">
                    <div className="h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                    </div>
                    
                    {/* Slider Handle with Logo */}
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${(riskLevel - 1) * 25}%` }}
                    >
                      <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashbox Logo" 
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Slider
                    value={[riskLevel]}
                    onValueChange={(value) => setRiskLevel(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full opacity-0 absolute inset-0"
                  />
                  
                  <div className="flex justify-between text-xs text-white/60 mt-2">
                    <span className="flex items-center gap-1">
                      😌 Low Risk
                    </span>
                    <span className="flex items-center gap-1">
                      😰 High Risk
                    </span>
                  </div>
                  
                  <div className="bg-white/20 rounded-stashbox p-3 mt-3">
                    <div className="text-xs text-white/70">
                      Expected APY: {(3 + riskLevel * 1.5).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-stashbox p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-white flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Make this a shared jar
                    </Label>
                    <p className="text-xs text-white/60">
                      Allow others to contribute to your goal
                    </p>
                  </div>
                  <Switch
                    checked={isSharedJar}
                    onCheckedChange={setIsSharedJar}
                  />
                </div>
                
                {/* {isSharedJar && goalName && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )} */}
              </div>
            </>
          )}

          {/* Add shared jar option for quick start jars too */}
          {/* {(type === "quick" || type === "safe" || type === "grow") && (
            <div className="bg-white/10 rounded-stashbox p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-white flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Make this a shared jar
                  </Label>
                  <p className="text-xs text-white/60">
                    Allow others to contribute to your goal
                  </p>
                </div>
                <Switch
                  checked={isSharedJar}
                  onCheckedChange={setIsSharedJar}
                />
              </div>
              
              {isSharedJar && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          )} */}
          
          {/* <div className="space-y-4">
            <Label className="text-sm font-medium text-white">
              {t('modal.duration')} ({duration} {t('modal.days')})
            </Label>
            
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
                      {option}{t('modal.days').substring(0,1)}
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
          </div> */}

          {/* Return Estimator Cards */}
          {/* {type !== "custom" && amount && (
            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <h4 className="text-sm font-medium text-white">{t('modal.returnEstimate')}</h4>
              </div>
              
              <div className="text-lg font-semibold text-stashbox-mint">
                {t('modal.youllGet', { amount: calculateEstimatedReturn().toFixed(2) })}
              </div>
              
              <p className="text-xs text-white/60">
                {t('modal.apy', { rate: config.apy })}
              </p>
            </div>
          )} */}

          {/* Custom Return Estimator Card */}
          {/* {type === "custom" && targetAmount && (
            <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <h4 className="text-sm font-medium text-white">{t('modal.customReturnEstimate')}</h4>
              </div>
              
              <div className="text-lg font-semibold text-stashbox-mint">
                {t('modal.estimatedReturn', { amount: calculateCustomReturn().toFixed(2) })}
              </div>
              
              <p className="text-xs text-white/60">
                {t('modal.apy', { rate: getRiskAPY().toFixed(1) })}
              </p>
            </div>
          )} */}
          
          <div className="bg-white/10 rounded-stashbox p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Make this a shared jar
                </Label>
                <p className="text-xs text-white/60">
                  Allow others to contribute to your goal
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
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Leaf className="w-4 h-4" />
            {type === "custom" ? (isSharedJar ? "Create Shared Jar" : "Create Jar") : "Start Saving"}
          </Button>
          
          {/* {config.penalty && (
            <p className="text-xs text-gray-300 text-center">
              {t('modal.earlyWithdrawalPenalty', { penalty: config.penalty })}
            </p>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;
