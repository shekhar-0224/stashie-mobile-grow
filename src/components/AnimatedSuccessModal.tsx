
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
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setAnimationCycle(prev => (prev + 1) % 4);
    }, 4500); // 4.5 second loop

    return () => clearInterval(interval);
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

  // Get plant type based on jar
  const getPlantElement = () => {
    switch (jarType) {
      case "safe":
        return (
          <div className="w-8 h-8 text-blue-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L14 8H20L15.5 12L17 18L12 15L7 18L8.5 12L4 8H10L12 2Z"/>
            </svg>
          </div>
        );
      case "grow":
        return (
          <div className="w-8 h-8 text-green-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13 17 8 17 8Z"/>
            </svg>
          </div>
        );
      case "custom":
        return (
          <div className="w-8 h-8 text-purple-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L13.09 8.26L20 7L14 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L10 12L4 7L10.91 8.26L12 2Z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 text-green-600 animate-sway">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C12.7 8 13.4 8.1 14 8.4V22H10V8.4C10.6 8.1 11.3 8 12 8Z"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] glass-modal border-none rounded-stashbox animate-scale-in bg-white/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          {/* Animated Jar Container */}
          <div className="relative">
            {/* Main Jar */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Jar Body */}
              <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${getJarColor()} shadow-xl relative overflow-hidden border-4 border-white/50`}>
                {/* Water Fill Animation */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400/60 to-blue-300/40 transition-all duration-[4500ms] ease-in-out rounded-b-3xl"
                  style={{
                    height: animationCycle >= 1 ? '70%' : '0%',
                    opacity: animationCycle >= 1 ? 1 : 0
                  }}
                >
                  {/* Water Surface Shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>

                {/* Jar Face - appears after water fills */}
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                    animationCycle >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
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

              {/* Growing Plant Animation */}
              <div 
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-[2000ms] ease-out ${
                  animationCycle >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-50'
                }`}
              >
                <div className={`transform transition-transform duration-[3000ms] ease-in-out ${
                  animationCycle >= 3 ? 'rotate-3' : 'rotate-0'
                }`}>
                  {getPlantElement()}
                </div>
              </div>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute transition-all duration-[1500ms] ease-out ${
                    animationCycle >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${15 + (i % 2) * 30}%`,
                    animationDelay: `${i * 400}ms`
                  }}
                >
                  <Sparkles
                    className="w-4 h-4 text-stashbox-mint animate-pulse"
                    style={{
                      animationDuration: '2s',
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Gentle Glow Effect */}
            <div 
              className={`absolute inset-0 -m-4 bg-gradient-radial from-stashbox-mint/20 to-transparent rounded-full transition-opacity duration-[3000ms] ${
                animationCycle >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
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
