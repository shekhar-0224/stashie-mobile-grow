import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { SAVINGS_JARS } from "@/constants";
import { Copy, Share2, Leaf, TrendingUp, Users, ArrowLeft, X } from "lucide-react";
import JarSuccessModal from "./JarSuccessModal";
import AmountInput from "./AmountInput";
import GrowthStrategySelector from "./GrowthStrategySelector";
import ExpectedReturns from "./ExpectedReturns";
import { SavingsModalProps } from "@/types";

const SavingsModal = ({ isOpen, onClose, type }: SavingsModalProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<number>(30);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState(2);
  const [isSharedJar, setIsSharedJar] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [animatingDuration, setAnimatingDuration] = useState<number | null>(null);
  
  // Betting jar states
  const [betDescription, setBetDescription] = useState("");
  const [winConditions, setWinConditions] = useState("");
  const [inviteList, setInviteList] = useState("");

  const durationOptions = [
    { days: 30, label: "30d" },
    { days: 90, label: "90d" },
    { days: 180, label: "180d" },
    { days: 365, label: "365d" }
  ];

  const handleDurationChange = (days: number) => {
    setAnimatingDuration(days);
    setTimeout(() => {
      setDuration(days);
      setAnimatingDuration(null);
    }, 200);
  };

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
      { name: 'Conservative', apy: 3.0 },
      { name: 'Moderate', apy: 6.0 },
      { name: 'Aggressive', apy: 9.0 }
    ];
    return riskOptions[level - 1] || riskOptions[1];
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
    if (type !== "betting" && isSharedJar) {
      setShowShareOptions(true);
      return;
    }

    setShowSuccessModal(true);
    
    const confettiEvent = () => {
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100]);
      }
      
      toast({
        title: type === "betting" ? "Betting Jar Created!" : t('toast.saved'),
        description: type === "betting" ? "Your betting jar is ready for participants!" : t('toast.savedDescription'),
      });
    };

    setTimeout(confettiEvent, 300);
    
    setTimeout(() => {
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
    }, 2000);
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
              <AmountInput
                value={betDescription}
                onChange={(value) => setBetDescription(value)}
                placeholder="e.g., Who will win the match?"
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="winConditions" className="text-xs font-medium text-white">
                Set win condition(s)
              </Label>
              <AmountInput
                value={winConditions}
                onChange={(value) => setWinConditions(value)}
                placeholder="e.g., Team A wins or match ends in draw"
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inviteList" className="text-xs font-medium text-white">
                Invite people to join
              </Label>
              <AmountInput
                value={inviteList}
                onChange={(value) => setInviteList(value)}
                placeholder="Enter email addresses or usernames"
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[350px] max-h-[85vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
          <DialogHeader className="relative pb-0">
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
          
          <div className="space-y-2.5 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="purpose" className="text-xs font-medium text-white">
                {type === "custom" ? t('modal.goalName') : "Purpose"}
              </Label>
              <AmountInput
                value={goalName}
                onChange={(value) => setGoalName(value.slice(0, 20))}
                placeholder={type === "custom" ? t('modal.goalNamePlaceholder') : "e.g., Vacation fund"}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
                maxLength={20}
              />
              <p className="text-xs text-white/60">{goalName.length}/20 characters</p>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="amount" className="text-xs font-medium text-white">
                {type === "custom" ? t('modal.targetAmount') : t('modal.enterAmount')}
              </Label>
              <AmountInput
                value={type === "custom" ? targetAmount : amount}
                onChange={type === "custom" ? (value) => setTargetAmount(value) : (value) => setAmount(value)}
                placeholder={config.placeholder}
                className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white">
                Duration ({duration} days)
              </Label>
              
              <div className="bg-white/10 rounded-stashbox p-2">
                <div className="flex gap-1.5">
                  {durationOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => handleDurationChange(option.days)}
                      className={`flex-1 rounded-full py-1.5 px-2 text-xs font-medium transition-all duration-200 ${
                        duration === option.days
                          ? 'bg-stashbox-mint text-gray-800'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      } ${
                        animatingDuration === option.days
                          ? 'animate-pulse scale-95'
                          : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {type === "custom" && (
              <GrowthStrategySelector
                riskLevel={riskLevel}
                onRiskLevelChange={setRiskLevel}
              />
            )}

            <ExpectedReturns
              amount={type === "custom" ? targetAmount : amount}
              duration={duration}
              apy={type === "custom" ? currentRiskData.apy : config.apy || 0}
              showPercentage={type !== "custom"}
            />
            
            <div className="bg-white/10 rounded-stashbox p-2.5 space-y-2">
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
              {type === "custom" ? "Stash It" : "Start Saving"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <JarSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        jarName={goalName || config.title}
        amount={type === "custom" ? targetAmount : amount}
      />
    </>
  );
};

export default SavingsModal;
