
import { Button } from "@/components/ui/button";
import { User, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

interface HeaderProps {
  onTotalSavedClick?: () => void;
}

const Header = ({ onTotalSavedClick }: HeaderProps) => {
  const { t } = useTranslation();
  const [streak] = useState({
    streakDays: 5,
    nextBadgeAt: 7
  });

  return (
    <div className="px-6 py-4 space-y-4">
      {/* Top Row - Fixed Layout */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-stashbox-orange to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/091f1444-42b6-4d20-808e-e89d3b9acca3.png" 
              alt="Stashbox Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stashbox-text">Hey Emma,</h1>
            <p className="text-base text-stashbox-text font-medium opacity-70">let's grow your stash!</p>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Streak Icon */}
          <div className="flex items-center space-x-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full px-3 py-2 shadow-lg mr-2">
            <Flame className="w-4 h-4 text-white animate-bounce" fill="currentColor" />
            <span className="text-sm font-bold text-white">{streak.streakDays}</span>
          </div>
          
          <LanguageSelector />
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-10 h-10 p-0 bg-stashbox-orange/20 hover:bg-stashbox-orange/30 rounded-full border-2 border-stashbox-orange ml-1"
            onClick={() => window.location.href = '/profile'}
          >
            <User className="w-5 h-5 text-stashbox-text" />
          </Button>
        </div>
      </div>

      {/* Total Saved Card - Simpler Design */}
      <Card 
        className="p-6 bg-gradient-to-br from-stashbox-mint/90 to-stashbox-mint/70 backdrop-blur-sm cursor-pointer hover:from-stashbox-mint/95 hover:to-stashbox-mint/80 transition-all duration-300 border-0 shadow-xl relative overflow-hidden transform hover:scale-[1.02] rounded-3xl"
        onClick={onTotalSavedClick}
      >
        {/* Logo Character Illustration */}
        <div className="absolute top-4 right-6">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center relative">
            <img 
              src="/lovable-uploads/091f1444-42b6-4d20-808e-e89d3b9acca3.png" 
              alt="Stashbox Character" 
              className="w-12 h-12 object-contain"
            />
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
