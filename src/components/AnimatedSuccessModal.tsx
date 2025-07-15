
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

  // Get jar color based on type
  const getJarColor = () => {
    switch (jarType) {
      case "safe": return "from-stashbox-blue to-blue-300";
      case "grow": return "from-stashbox-mint to-green-300";
      case "custom": return "from-stashbox-purple to-purple-300";
      case "betting": return "from-stashbox-orange to-orange-300";
      default: return "from-stashbox-yellow to-yellow-300";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] glass-modal border-none rounded-stashbox animate-scale-in bg-white/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          {/* Simple Jar Logo */}
          <div className="relative">
            <div className="relative w-32 h-32 mx-auto">
              {/* Jar Body */}
              <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${getJarColor()} shadow-xl relative overflow-hidden border-4 border-white/50`}>
                {/* Water Fill - Simple transition */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400/60 to-blue-300/40 transition-all duration-2000 ease-in-out rounded-b-3xl ${
                    isFilled ? 'h-3/4 opacity-100' : 'h-0 opacity-0'
                  }`}
                >
                  {/* Simple water surface shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>

                {/* Simple jar face - appears when filled */}
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                    isFilled ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex space-x-3 mb-4">
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="w-4 h-2 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Jar Rim */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg border-2 border-white/50"></div>
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
