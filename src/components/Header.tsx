
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
    <div className="px-6 py-3 space-y-3">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-stashbox-orange rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-stashbox-text">Hey Emma,</h1>
            <p className="text-sm text-stashbox-text/60">let's grow your stash!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total Saved Card - More compact and sleek */}
      <Card 
        className="p-4 bg-gradient-to-r from-stashbox-mint/30 to-stashbox-mint/20 cursor-pointer hover:from-stashbox-mint/40 hover:to-stashbox-mint/30 transition-all duration-200 border-0 shadow-lg relative overflow-hidden"
        onClick={onTotalSavedClick}
      >
        {/* Cute mascot in top right */}
        <div className="absolute top-2 right-4 flex items-center space-x-1">
          <div className="w-6 h-6 bg-stashbox-mint rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full ml-1"></div>
          </div>
          <div className="w-3 h-3 bg-stashbox-yellow rounded-full"></div>
        </div>
        
        <div className="pr-16">
          <p className="text-sm text-stashbox-text/60 mb-1">Your total saved so far:</p>
          <p className="text-3xl font-bold text-stashbox-text mb-1">$1,200</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-green-600 font-medium">+$280.45 this month</p>
            <p className="text-xs text-stashbox-text/60">5 Active Jars • Tap to view</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;
