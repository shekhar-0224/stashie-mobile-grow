import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Coins, Swords, Plus } from "lucide-react";
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
  return <div className="space-y-6">
      <h2 className="text-xl font-bold text-stashbox-text">Create Custom Jar</h2>
      
      <div className="flex gap-4 justify-center">
        {/* Saving Jar - Simple Square */}
        <div className="flex flex-col items-center space-y-3">
          <Button onClick={onSavingJar} className="w-24 h-24 bg-emerald-200 hover:bg-emerald-300 border-2 border-emerald-400 rounded-2xl shadow-none flex items-center justify-center transition-all duration-200 hover:scale-105">
            <div className="flex flex-col items-center gap-1">
              <img src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" alt="Stashbox Logo" className="w-6 h-6" />
              
            </div>
          </Button>
          <span className="text-sm font-semibold text-stashbox-text">Saving Jar</span>
        </div>

        {/* Betting Jar - Simple Square */}
        <div className="flex flex-col items-center space-y-3">
          <Button onClick={onBettingJar} className="w-24 h-24 bg-yellow-200 hover:bg-yellow-300 border-2 border-yellow-400 rounded-2xl shadow-none flex items-center justify-center transition-all duration-200 hover:scale-105">
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <img src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" alt="Stashbox Logo" className="w-5 h-5" />
                <Swords className="w-3 h-3 text-yellow-800 absolute -top-0.5 -right-0.5" />
              </div>
              
            </div>
          </Button>
          <span className="text-sm font-semibold text-stashbox-text">Betting Jar</span>
        </div>

        {/* Coming Soon - Simple Square */}
        <div className="flex flex-col items-center space-y-3">
          <Button disabled className="w-24 h-24 bg-gray-200 border-2 border-gray-300 rounded-2xl shadow-none flex items-center justify-center opacity-60">
            <div className="flex flex-col items-center gap-1">
              <img src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" alt="Stashbox Logo" className="w-5 h-5 opacity-50" />
              <Plus className="w-3 h-3 text-gray-500" />
            </div>
          </Button>
          <span className="text-sm font-medium text-gray-500">Coming Soon</span>
        </div>
      </div>
    </div>;
};
export default CustomJarSection;