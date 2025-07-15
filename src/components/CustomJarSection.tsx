
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
        {/* Saving Jar - Simplified */}
        <Button
          onClick={onSavingJar}
          className="flex-1 max-w-[140px] h-24 p-4 bg-transparent hover:bg-emerald-50/50 border-0 shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group"
        >
          {/* Glass Jar Icon */}
          <div className="w-12 h-12 bg-gradient-to-b from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-2xl relative overflow-hidden shadow-lg">
            {/* Liquid Fill */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-b-2xl"></div>
            
            {/* Floating Coins */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-yellow-400 border border-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="absolute bottom-4 left-2">
              <div className="w-1.5 h-1.5 bg-yellow-300 border border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Growing Leaf */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
              <Leaf className="w-3 h-3 text-green-600 drop-shadow-sm" />
            </div>
            
            {/* S Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white border border-emerald-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-emerald-600">S</span>
              </div>
            </div>
          </div>
          
          <span className="text-sm font-bold text-emerald-700">Saving Jar</span>
        </Button>

        {/* Betting Jar - Simplified */}
        <Button
          onClick={onBettingJar}
          className="flex-1 max-w-[140px] h-24 p-4 bg-transparent hover:bg-orange-50/50 border-0 shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group"
        >
          {/* Glass Jar Icon */}
          <div className="w-12 h-12 bg-gradient-to-b from-orange-100 to-orange-200 border-2 border-orange-300 rounded-2xl relative overflow-hidden shadow-lg">
            {/* Coins */}
            <div className="absolute bottom-2 left-2">
              <div className="w-2 h-2 bg-yellow-400 border border-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="w-2 h-2 bg-yellow-400 border border-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-1.5 h-1.5 bg-yellow-300 border border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Trending Up Icon */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
              <TrendingUp className="w-3 h-3 text-orange-600 drop-shadow-sm" />
            </div>
            
            {/* S Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white border border-orange-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-orange-600">S</span>
              </div>
            </div>
            
            {/* Sparkle Effect */}
            <div className="absolute top-0.5 right-0.5 text-yellow-400 text-xs drop-shadow-sm">✨</div>
          </div>
          
          <span className="text-sm font-bold text-orange-700">Betting Jar</span>
        </Button>

        {/* Coming Soon Jar - Simplified */}
        <Button
          disabled
          className="flex-1 max-w-[140px] h-24 p-4 bg-transparent border-0 shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 opacity-60"
        >
          {/* S-Logo Jar Base - Faded */}
          <div className="w-12 h-12 bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-300 rounded-2xl relative">
            {/* S Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">S</span>
              </div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-400">Coming Soon</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomJarSection;
