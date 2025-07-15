
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

interface JarSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  jarName: string;
  amount: string;
}

const JarSuccessModal = ({ isOpen, onClose, jarName, amount }: JarSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[320px] glass-modal border-none rounded-stashbox animate-scale-in">
        <div className="flex flex-col items-center text-center py-4 space-y-4">
          {/* Animated Jar Container */}
          <div className="relative">
            {/* Main Jar */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-stashbox-mint to-green-400 shadow-lg relative overflow-hidden animate-bounce">
                {/* Jar Face */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gray-700 rounded-full"></div>
                
                {/* Jar Lid */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-green-600 rounded-full shadow-md"></div>
                
                {/* Plant/Leaf on top */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 2L13.09 8.26L20 7L14 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L10 12L4 7L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Coins */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-bounce"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 5}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.5s'
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800">
                    $
                  </div>
                </div>
              ))}
            </div>

            {/* Sparkles */}
            <div className="absolute -inset-4 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute w-3 h-3 text-yellow-400 animate-pulse`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Success Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Jar Created!</h3>
            </div>
            <p className="text-white/80 text-sm">
              Your <span className="font-medium text-stashbox-mint">{jarName}</span> jar is ready
            </p>
            {amount && (
              <p className="text-white/60 text-xs">
                Starting with ${amount}
              </p>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={onClose}
            className="w-full bg-stashbox-mint text-gray-600 hover:bg-stashbox-mint/90 font-medium py-2 rounded-stashbox text-sm h-8"
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JarSuccessModal;
