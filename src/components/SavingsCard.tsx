
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
}

const SavingsCard = ({ 
  title, 
  subtitle,
  caption,
  background, 
  onAction, 
  animationDelay = 0,
  progress = 0,
  progressColor = "#AEE6C5",
  isGoalJar = false
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
      className={`p-6 rounded-stashbox animate-fade-in transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
        showConfetti ? 'animate-pulse' : ''
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

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-stashbox-text mb-1">
            {isGoalJar ? title : subtitle}
          </h3>
          <p className="text-stashbox-text/80 text-sm leading-relaxed">
            {isGoalJar ? caption : caption}
          </p>
        </div>
        
        {/* Progress bar for vault cards */}
        {!isGoalJar && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stashbox-text/60">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-white/30"
              style={{
                '--progress-color': progressColor
              } as React.CSSProperties}
            />
          </div>
        )}
        
        <Button 
          onClick={handleButtonClick}
          className={`w-full bg-white text-stashbox-text hover:bg-white/90 font-medium py-3 rounded-stashbox transition-all duration-200 transform hover:scale-105 ${
            isPressed ? 'animate-bounce-gentle scale-95' : ''
          }`}
        >
          {isGoalJar ? 'Create Jar' : 'Start Saving'}
        </Button>
      </div>
    </div>
  );
};

export default SavingsCard;
