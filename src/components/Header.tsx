
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onTotalSavedClick?: () => void;
}

const Header = ({ onTotalSavedClick }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-4 space-y-5">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-stashbox-orange to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stashbox-text">Hey Emma,</h1>
            <p className="text-base text-stashbox-text font-medium opacity-70">let's grow your stash!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full">
            <Bell className="w-5 h-5 text-stashbox-text" />
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full">
            <User className="w-5 h-5 text-stashbox-text" />
          </Button>
        </div>
      </div>

      {/* Total Saved Card - Redesigned */}
      <Card 
        className="p-6 bg-gradient-to-br from-stashbox-mint/80 to-stashbox-mint/60 backdrop-blur-sm cursor-pointer hover:from-stashbox-mint/90 hover:to-stashbox-mint/70 transition-all duration-300 border-0 shadow-xl relative overflow-hidden transform hover:scale-[1.02] rounded-3xl"
        onClick={onTotalSavedClick}
      >
        {/* Background illustration */}
        <div className="absolute top-4 right-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-2xl">💰</div>
          </div>
        </div>
        
        <div className="pr-20">
          <p className="text-sm font-semibold text-stashbox-text/80 mb-2">Your total saved so far:</p>
          <div className="flex items-baseline space-x-3 mb-3">
            <p className="text-4xl font-bold text-stashbox-text">$1,200</p>
            <p className="text-sm text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full">+$280.45</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-stashbox-text/90 font-semibold hover:text-stashbox-text hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-200"
          >
            5 Active Jars • Tap to view →
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Header;
