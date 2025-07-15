
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
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsFilled(false);
      return;
    }
    
    // Start fill animation after modal opens
    const fillTimer = setTimeout(() => {
      setIsFilled(true);
    }, 300);

    return () => clearTimeout(fillTimer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] glass-modal border-none rounded-stashbox animate-scale-in bg-white/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          {/* Mascot Logo with fill animation */}
          <div className="relative">
            <div className="relative w-32 h-32 mx-auto">
              {/* Base mascot logo */}
              <img 
                src="/lovable-uploads/763f2049-5f89-4c6d-9b2b-457e95ab356d.png" 
                alt="Stashie mascot"
                className="w-full h-full object-contain"
              />
              
              {/* Water fill overlay - appears when filled */}
              <div 
                className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                  isFilled ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Subtle blue tint overlay to show "filled" state */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-lg mix-blend-multiply"></div>
              </div>
            </div>

            {/* Simple sparkles - only show when filled */}
            {isFilled && (
              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-4 right-4 w-4 h-4 text-stashbox-mint animate-pulse" />
                <Sparkles className="absolute bottom-8 left-4 w-3 h-3 text-stashbox-mint animate-pulse" style={{ animationDelay: '1s' }} />
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
