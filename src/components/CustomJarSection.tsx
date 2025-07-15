
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Leaf, TrendingUp } from "lucide-react";

interface CustomJarSectionProps {
  onSavingJar: () => void;
  onBettingJar: () => void;
}

const CustomJarSection = ({ onSavingJar, onBettingJar }: CustomJarSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stashbox-text">Create Custom Jar</h2>
      
      <div className="flex gap-4 justify-center">
        {/* Saving Jar */}
        <Button
          onClick={onSavingJar}
          className="flex-1 max-w-[120px] h-32 p-4 bg-gradient-to-b from-stashbox-mint/20 to-stashbox-mint/40 hover:from-stashbox-mint/30 hover:to-stashbox-mint/50 border-2 border-stashbox-mint/30 rounded-stashbox flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group"
        >
          <div className="relative">
            {/* S-Logo Jar Base */}
            <div className="w-16 h-16 bg-gradient-to-b from-blue-200 to-blue-300 rounded-2xl border-2 border-blue-400/50 relative overflow-hidden">
              {/* Water Fill Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-stashbox-mint to-stashbox-mint/70 animate-fluid-fill"></div>
              
              {/* Coins */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
              </div>
              
              {/* Growing Plant */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <Leaf className="w-4 h-4 text-green-500 animate-pulse" />
              </div>
              
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">S</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-stashbox-text">Saving Jar</span>
        </Button>

        {/* Betting Jar */}
        <Button
          onClick={onBettingJar}
          className="flex-1 max-w-[120px] h-32 p-4 bg-gradient-to-b from-stashbox-orange/20 to-stashbox-orange/40 hover:from-stashbox-orange/30 hover:to-stashbox-orange/50 border-2 border-stashbox-orange/30 rounded-stashbox flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group"
        >
          <div className="relative">
            {/* S-Logo Jar Base */}
            <div className="w-16 h-16 bg-gradient-to-b from-orange-200 to-orange-300 rounded-2xl border-2 border-orange-400/50 relative overflow-hidden animate-pulse">
              {/* Coins */}
              <div className="absolute bottom-2 left-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              
              {/* Trending Up Icon */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <TrendingUp className="w-4 h-4 text-white animate-sparkle" />
              </div>
              
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-orange-600">S</span>
                </div>
              </div>
              
              {/* Sparkle Effect */}
              <div className="absolute top-0 right-0 text-yellow-300 text-xs animate-sparkle">✨</div>
            </div>
          </div>
          <span className="text-xs font-medium text-stashbox-text">Betting Jar</span>
        </Button>

        {/* Coming Soon Jar */}
        <Button
          disabled
          className="flex-1 max-w-[120px] h-32 p-4 bg-gray-100 border-2 border-gray-200 rounded-stashbox flex flex-col items-center justify-center space-y-2 opacity-50"
        >
          <div className="relative">
            {/* S-Logo Jar Base - Faded */}
            <div className="w-16 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl border-2 border-gray-300 relative">
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-400">S</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-400">Coming Soon</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomJarSection;
