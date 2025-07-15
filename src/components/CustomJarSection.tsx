
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
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-stashbox-text">Create Custom Jar</h2>
      
      <div className="flex gap-3 justify-center">
        {/* Saving Jar - Glassy and Poppy */}
        <Button
          onClick={onSavingJar}
          className="flex-1 max-w-[130px] h-28 p-3 bg-gradient-to-br from-emerald-100/80 to-mint-200/70 backdrop-blur-md border-2 border-white/40 shadow-lg hover:shadow-xl rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Glassy Jar */}
            <div className="w-14 h-14 bg-gradient-to-b from-emerald-200/60 to-emerald-300/80 backdrop-blur-sm rounded-2xl border border-white/30 relative overflow-hidden shadow-inner">
              {/* Liquid Fill Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-emerald-400/80 to-emerald-300/60 animate-fluid-fill rounded-b-2xl"></div>
              
              {/* Floating Coins */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce-gentle shadow-sm"></div>
              </div>
              
              {/* Growing Plant */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <Leaf className="w-3.5 h-3.5 text-green-600 animate-pulse drop-shadow-sm" />
              </div>
              
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-emerald-600">S</span>
                </div>
              </div>
              
              {/* Glass shine effect */}
              <div className="absolute top-1 left-1 w-3 h-6 bg-white/40 rounded-full blur-sm"></div>
            </div>
          </div>
          
          <span className="text-xs font-bold text-emerald-700 drop-shadow-sm relative z-10">Saving Jar</span>
        </Button>

        {/* Betting Jar - Glassy and Poppy */}
        <Button
          onClick={onBettingJar}
          className="flex-1 max-w-[130px] h-28 p-3 bg-gradient-to-br from-orange-100/80 to-amber-200/70 backdrop-blur-md border-2 border-white/40 shadow-lg hover:shadow-xl rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Glassy Jar */}
            <div className="w-14 h-14 bg-gradient-to-b from-orange-200/60 to-orange-300/80 backdrop-blur-sm rounded-2xl border border-white/30 relative overflow-hidden shadow-inner animate-pulse">
              {/* Coins */}
              <div className="absolute bottom-2 left-2">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm"></div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm"></div>
              </div>
              
              {/* Trending Up Icon */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <TrendingUp className="w-3.5 h-3.5 text-white animate-sparkle drop-shadow-sm" />
              </div>
              
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-orange-600">S</span>
                </div>
              </div>
              
              {/* Sparkle Effect */}
              <div className="absolute top-0 right-0 text-yellow-300 text-xs animate-sparkle drop-shadow-sm">✨</div>
              
              {/* Glass shine effect */}
              <div className="absolute top-1 left-1 w-3 h-6 bg-white/40 rounded-full blur-sm"></div>
            </div>
          </div>
          
          <span className="text-xs font-bold text-orange-700 drop-shadow-sm relative z-10">Betting Jar</span>
        </Button>

        {/* Coming Soon Jar */}
        <Button
          disabled
          className="flex-1 max-w-[130px] h-28 p-3 bg-gray-50/80 backdrop-blur-md border-2 border-gray-200/40 rounded-3xl flex flex-col items-center justify-center space-y-2 opacity-60"
        >
          <div className="relative">
            {/* S-Logo Jar Base - Faded */}
            <div className="w-14 h-14 bg-gradient-to-b from-gray-200/60 to-gray-300/40 rounded-2xl border border-gray-300/30 relative">
              {/* S Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 bg-white/50 rounded-full flex items-center justify-center">
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
