
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
  const [duration, setDuration] = useState<number>(90);
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
    setDuration(90);
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
        <DialogContent className="sm:max-w-[400px] bg-white rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader className="relative pb-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-2 pr-8">
              <TrendingUp className="w-5 h-5 text-stashbox-orange" />
              <span>{config.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="betDescription" className="text-sm font-medium text-gray-700">
                Define the bet
              </Label>
              <Input
                id="betDescription"
                placeholder="e.g., Who will win the match?"
                value={betDescription}
                onChange={(e) => setBetDescription(e.target.value)}
                className="rounded-xl border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="winConditions" className="text-sm font-medium text-gray-700">
                Set win condition(s)
              </Label>
              <Input
                id="winConditions"
                placeholder="e.g., Team A wins or match ends in draw"
                value={winConditions}
                onChange={(e) => setWinConditions(e.target.value)}
                className="rounded-xl border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteList" className="text-sm font-medium text-gray-700">
                Invite people to join
              </Label>
              <Input
                id="inviteList"
                placeholder="Enter email addresses or usernames"
                value={inviteList}
                onChange={(e) => setInviteList(e.target.value)}
                className="rounded-xl border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 h-12"
              />
            </div>

            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-orange-800 leading-relaxed">
                💡 <span className="font-medium">How it works:</span> Funds are pooled together. Manual agreement or consensus closes the bet. Winner receives the full pot.
              </p>
            </div>
            
            <Button
              onClick={handleDeposit}
              className="w-full bg-stashbox-orange text-white hover:bg-stashbox-orange/90 font-medium py-3 rounded-xl transition-all duration-200 h-12"
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
        <DialogContent className="sm:max-w-[400px] bg-white rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader className="relative pb-4">
            <Button
              onClick={handleBackToForm}
              variant="ghost"
              size="sm"
              className="absolute -left-2 -top-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold text-gray-800 text-center px-8">
              🎉 Jar Created!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Your {goalName || config.title} is ready! Share it with others to start collecting contributions.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-12"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-12"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            <Button
              onClick={onClose}
              className="w-full bg-stashbox-mint text-gray-700 hover:bg-stashbox-mint/90 font-medium py-3 rounded-xl h-12"
            >
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Custom Jar Modal - New Design
  if (type === "custom") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] bg-white rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader className="relative pb-6">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold text-gray-800 text-center pr-8">
              {config.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Goal Name Section */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">What are you saving for?</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg">🎯</span>
                <Input
                  id="goalName"
                  placeholder="e.g., PS5, Rent, Travel Fund"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="rounded-full border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 h-12 pl-12"
                />
              </div>
            </div>

            {/* Target Amount Section */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">How much do you need?</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                <Input
                  id="goalAmount"
                  placeholder="500"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  type="number"
                  className="rounded-full border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 h-12 pl-8"
                />
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Select Duration</Label>
                <span className="text-sm text-gray-500">{duration} days</span>
              </div>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                max={365}
                min={30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>30 days</span>
                <span>365 days</span>
              </div>
            </div>

            {/* Growth Strategy Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Growth Strategy</Label>
                <span className="text-sm text-gray-500">🌱</span>
              </div>
              
              <div className="relative">
                <div className="h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full mb-4"></div>
                <Slider
                  value={[riskLevel]}
                  onValueChange={(value) => setRiskLevel(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full absolute top-0"
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>Low = safer</span>
                <span>High = higher risk & reward</span>
              </div>
              
              <p className="text-sm text-gray-600">
                Expected APY: <span className="font-medium">{getRiskAPY().toFixed(1)}%</span>
              </p>
            </div>

            {/* Shared Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">Allow friends to contribute</Label>
                <p className="text-xs text-gray-500">Enable collaborative saving with others</p>
              </div>
              <Switch
                checked={isSharedJar}
                onCheckedChange={setIsSharedJar}
              />
            </div>
            
            <Button
              onClick={handleDeposit}
              className="w-full bg-stashbox-mint text-gray-700 hover:bg-stashbox-mint/90 font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 h-12"
            >
              🌿 Create Jar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Default Modal View for other types
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[350px] max-h-[80vh] overflow-y-auto glass-modal border-none rounded-stashbox animate-slide-up">
        <DialogHeader className="relative pb-2">
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
        
        <div className="space-y-3 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-xs font-medium text-white">
              {t('modal.enterAmount')}
            </Label>
            <Input
              id="amount"
              placeholder={config.placeholder}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-8"
            />
          </div>
          
          <Button
            onClick={handleDeposit}
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox transition-all duration-200 flex items-center justify-center gap-2 text-sm h-8"
          >
            <Leaf className="w-3 h-3" />
            Start Saving
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;
