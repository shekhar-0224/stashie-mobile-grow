import { useState } from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<number>(30);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState(2);

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
          title: t('modal.createGoalJar'),
          ...SAVINGS_JARS.CUSTOM,
          placeholder: "e.g., 500"
        };
      default:
        return {
          title: t('modal.startQuickSave'),
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
        title: t('toast.saved'),
        description: t('toast.savedDescription'),
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
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white">
                {t('modal.chooseRiskLevel')}: {riskLevel} 
                <span className="text-xs text-white/70 ml-2">{t('modal.higherRiskHigherReturns')}</span>
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
                  <span>{t('modal.lowRisk')}</span>
                  <span>{t('modal.highRisk')}</span>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-stashbox p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm">📊</span>
                  <span className="text-sm font-medium text-white">{t('modal.expectedReturn')}</span>
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
                  {riskLevel * 20}% {t('modal.potential')}
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Label className="text-sm font-medium text-white">
              {t('modal.duration')} ({duration} {t('modal.days')})
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
          </div>

          {/* Return Estimator Card */}
          {type !== "custom" && amount && (
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
          )}

          {/* Custom Return Estimator Card */}
          {type === "custom" && targetAmount && (
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
          )}
          
          <Button
            onClick={handleDeposit}
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-3 rounded-stashbox transition-all duration-200 transform hover:scale-105 animate-bounce-gentle"
          >
            {type === "custom" ? t('modal.createJar') : t('modal.depositToJar')}
          </Button>
          
          {config.penalty && (
            <p className="text-xs text-gray-300 text-center">
              {t('modal.earlyWithdrawalPenalty', { penalty: config.penalty })}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;