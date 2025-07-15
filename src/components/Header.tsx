
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
          {/* Streak Icon */}
          <div className="flex items-center space-x-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full px-3 py-2 shadow-lg">
            <Flame className="w-4 h-4 text-white animate-bounce" fill="currentColor" />
            <span className="text-sm font-bold text-white">{streak.streakDays}</span>
          </div>
          
          <LanguageSelector />
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full">
            <User className="w-5 h-5 text-stashbox-text" />
          </Button>
        </div>
      </div>

      {/* Total Saved Card - Simpler Design */}
      <Card 
        className="p-6 bg-gradient-to-br from-stashbox-mint/90 to-stashbox-mint/70 backdrop-blur-sm cursor-pointer hover:from-stashbox-mint/95 hover:to-stashbox-mint/80 transition-all duration-300 border-0 shadow-xl relative overflow-hidden transform hover:scale-[1.02] rounded-3xl"
        onClick={onTotalSavedClick}
      >
        {/* Cute Character Illustration */}
        <div className="absolute top-4 right-6">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center relative">
            {/* Character eyes */}
            <div className="absolute top-3 left-4 w-2 h-2 bg-stashbox-text rounded-full"></div>
            <div className="absolute top-3 right-4 w-2 h-2 bg-stashbox-text rounded-full"></div>
            {/* Character beak/mouth */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
            {/* Sprouting leaf */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-green-500 text-lg">🌱</div>
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
