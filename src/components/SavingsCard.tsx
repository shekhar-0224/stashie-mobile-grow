
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface SavingsCardProps {
  title: string;
  subtitle: string;
  caption: string;
  background: string;
  onAction: () => void;
  animationDelay?: number;
  progress?: number;
  progressColor?: string;
  isGoalJar?: boolean;
  compact?: boolean;
}

const SavingsCard = ({
  title,
  subtitle,
  caption,
  background,
  onAction,
  animationDelay = 0,
  progress,
  progressColor,
  isGoalJar = false,
  compact = false
}: SavingsCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = () => {
    setIsPressed(true);
    setShowConfetti(true);
    
    // Reset animations
    setTimeout(() => {
      setIsPressed(false);
      setShowConfetti(false);
    }, 1000);
    
    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    onAction();
  };

  return (
    <div 
      className={`${compact ? 'p-4' : 'p-6'} rounded-stashbox animate-slide-up transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
        showConfetti ? 'animate-confetti' : ''
      }`}
      style={{ 
        backgroundColor: background,
        animationDelay: `${animationDelay}ms`
      }}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-sparkle text-2xl absolute top-2 left-2">✨</div>
          <div className="animate-sparkle text-2xl absolute top-2 right-2" style={{ animationDelay: '0.2s' }}>🎉</div>
          <div className="animate-sparkle text-2xl absolute bottom-2 left-2" style={{ animationDelay: '0.4s' }}>⭐</div>
          <div className="animate-sparkle text-2xl absolute bottom-2 right-2" style={{ animationDelay: '0.6s' }}>💫</div>
        </div>
      )}

      <div className={`space-y-${compact ? '2' : '4'}`}>
        <div>
          <h3 className={`font-semibold text-stashbox-text mb-1 ${compact ? 'text-sm' : 'text-xl'}`}>
            {isGoalJar ? title : subtitle}
          </h3>
          <p className={`text-stashbox-text/80 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
            {isGoalJar ? caption : caption}
          </p>
        </div>
        
        {/* Progress bar for vault cards */}
        {!isGoalJar && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stashbox-text/60">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="h-full rounded-full transition-all duration-1000 animate-fluid-fill"
                style={{
                  backgroundColor: progressColor,
                  width: `${progress}%`
                }}
              />
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleButtonClick}
          className={`w-full bg-white/20 backdrop-blur-sm text-stashbox-text hover:bg-white/30 font-medium ${compact ? 'py-2 text-sm' : 'py-3'} rounded-stashbox transition-all duration-200 transform hover:scale-105 animate-bounce-gentle ${
            isPressed ? 'scale-95' : ''
          }`}
        >
          {isGoalJar ? 'Create Goal' : 'Start Saving'}
        </Button>
      </div>
    </div>
  );
};

export default SavingsCard;
