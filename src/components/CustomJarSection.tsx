import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Leaf, TrendingUp } from "lucide-react";
interface CustomJarSectionProps {
  onSavingJar: () => void;
  onBettingJar: () => void;
}
const CustomJarSection = ({
  onSavingJar,
  onBettingJar
}: CustomJarSectionProps) => {
  const {
    t
  } = useTranslation();
  return <div className="space-y-4">
      <h2 className="text-xl font-bold text-stashbox-text">Create Custom Jar</h2>
      
      <div className="flex gap-4 justify-center">
        {/* Saving Jar */}
        <Button onClick={onSavingJar} className="flex-1 max-w-[140px] h-24 p-4 bg-transparent hover:bg-emerald-50/50 shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group border-0">
          {/* Square Glass Jar Icon */}
          <div className="w-16 h-16 bg-gradient-to-b from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-lg relative overflow-hidden shadow-lg">
            {/* Liquid Fill */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-b-lg"></div>
            
            {/* Floating Coins */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              
            </div>
            <div className="absolute bottom-5 left-3">
              <div className="w-2 h-2 bg-yellow-300 border border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Growing Leaf */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2">
              <Leaf className="w-4 h-4 text-green-600 drop-shadow-sm" />
            </div>
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-white border border-emerald-200 rounded-full flex items-center justify-center shadow-sm">
                <img src="/lovable-uploads/091f1444-42b6-4d20-808e-e89d3b9acca3.png" alt="Stashbox Logo" className="w-3 h-3 object-contain" />
              </div>
            </div>
          </div>
          
          <span className="text-sm font-bold text-emerald-700">Saving Jar</span>
        </Button>

        {/* Betting Jar */}
        <Button onClick={onBettingJar} className="flex-1 max-w-[140px] h-24 p-4 bg-transparent hover:bg-orange-50/50 shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 group border-0">
          {/* Square Glass Jar Icon */}
          <div className="w-16 h-16 bg-gradient-to-b from-orange-100 to-orange-200 border-2 border-orange-300 rounded-lg relative overflow-hidden shadow-lg">
            {/* Coins */}
            <div className="absolute bottom-3 left-3">
              <div className="w-2.5 h-2.5 bg-yellow-400 border border-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="absolute bottom-3 right-3">
              <div className="w-2.5 h-2.5 bg-yellow-400 border border-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-yellow-300 border border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Trending Up Icon */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2">
              <TrendingUp className="w-4 h-4 text-orange-600 drop-shadow-sm" />
            </div>
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-white border border-orange-200 rounded-full flex items-center justify-center shadow-sm">
                <img src="/lovable-uploads/091f1444-42b6-4d20-808e-e89d3b9acca3.png" alt="Stashbox Logo" className="w-3 h-3 object-contain" />
              </div>
            </div>
            
            {/* Sparkle Effect */}
            <div className="absolute top-1 right-1 text-yellow-400 text-sm drop-shadow-sm">✨</div>
          </div>
          
          <span className="text-sm font-bold text-orange-700">Betting Jar</span>
        </Button>

        {/* Coming Soon Jar */}
        <Button disabled className="flex-1 max-w-[140px] h-24 p-4 bg-transparent shadow-none rounded-3xl flex flex-col items-center justify-center space-y-2 opacity-60 border-0">
          {/* Square Logo Jar Base - Faded */}
          <div className="w-16 h-16 bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-300 rounded-lg relative">
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/091f1444-42b6-4d20-808e-e89d3b9acca3.png" alt="Stashbox Logo" className="w-3 h-3 object-contain opacity-50" />
              </div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-400">Coming Soon</span>
        </Button>
      </div>
    </div>;
};
export default CustomJarSection;