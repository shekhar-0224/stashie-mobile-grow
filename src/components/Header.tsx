
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onTotalSavedClick?: () => void;
}

const Header = ({ onTotalSavedClick }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-4 space-y-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-stashbox-orange rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-stashbox-text">Good morning</h1>
            <p className="text-sm text-stashbox-text/60">Ready to grow your savings?</p>
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

      {/* Total Saved Card - Now Clickable */}
      <Card 
        className="p-4 bg-gradient-to-r from-stashbox-mint/20 to-stashbox-blue/20 cursor-pointer hover:from-stashbox-mint/30 hover:to-stashbox-blue/30 transition-all duration-200"
        onClick={onTotalSavedClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stashbox-text/60">{t('header.totalSaved')}</p>
            <p className="text-2xl font-bold text-stashbox-text">$13,670.89</p>
            <p className="text-xs text-green-600 font-medium">+$280.45 this month</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stashbox-text/60">5 Active Jars</p>
            <p className="text-sm font-medium text-stashbox-text">Click to view all</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;
