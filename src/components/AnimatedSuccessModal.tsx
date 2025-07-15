
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AnimatedSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  jarName: string;
  amount: string;
  jarType?: "quick" | "safe" | "grow" | "custom" | "betting";
}

const AnimatedSuccessModal = ({ 
  isOpen, 
  onClose, 
  jarName, 
  amount, 
  jarType = "quick" 
}: AnimatedSuccessModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false);
      return;
    }
    
    // Start animation after modal opens
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 300);

    return () => clearTimeout(animationTimer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] glass-modal border-none rounded-stashbox animate-scale-in bg-white/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          {/* Mascot Logo with bounce animation */}
          <div className="relative">
            <div className="relative w-32 h-32 mx-auto">
              {/* Base mascot logo with bounce animation */}
              <img 
                src="/lovable-uploads/caec579f-952d-42b2-99af-2dd06979902d.png" 
                alt="Stashie mascot"
                className={`w-full h-full object-contain transition-all duration-1000 ${
                  isAnimating ? 'animate-bounce-gentle' : ''
                }`}
              />
            </div>

            {/* Animated sparkles - only show when animating */}
            {isAnimating && (
              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-4 right-4 w-4 h-4 text-stashbox-mint animate-pulse" />
                <Sparkles className="absolute bottom-8 left-4 w-3 h-3 text-stashbox-mint animate-pulse" style={{ animationDelay: '1s' }} />
                <Sparkles className="absolute top-8 left-6 w-3 h-3 text-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Sparkles className="absolute bottom-4 right-6 w-4 h-4 text-green-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
            )}
          </div>

          {/* Success Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-stashbox-text">Jar Created!</h2>
            </div>
            <p className="text-stashbox-text-light text-base leading-relaxed">
              Your <span className="font-semibold text-stashbox-text">{jarName}</span> is ready
            </p>
            {amount && (
              <p className="text-stashbox-text-light text-sm">
                Starting with ${amount}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-stashbox-mint to-green-400 text-gray-800 hover:from-stashbox-mint/90 hover:to-green-400/90 font-semibold py-3 rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/30"
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimatedSuccessModal;
