
import { useState } from "react";
import { User, Flame } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user] = useState({
    name: "Emma",
    totalSaved: "1,200"
  });

  const [streak] = useState({
    streakDays: 5,
    nextBadgeAt: 7
  });

  return (
    <header className="animate-fade-in p-6 bg-stashbox-cream">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie Mascot" 
              className="w-8 h-8 animate-bounce-gentle cursor-pointer hover:animate-sparkle"
              title={t('header.mascotTitle')}
              onClick={() => {
                // Add mascot reaction animation
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
              }}
            />
          </div>
          <div className="text-2xl font-bold text-stashbox-text">{t('header.appName')}</div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Streak indicator */}
          <div className="flex items-center space-x-1 bg-stashbox-yellow/20 px-2 py-1 rounded-full">
            <Flame className="w-4 h-4 text-stashbox-orange animate-bounce-gentle" />
            <span className="text-sm font-semibold text-stashbox-text">{streak.streakDays}</span>
          </div>
          
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Profile */}
          <div 
            className="w-10 h-10 bg-stashbox-orange rounded-full flex items-center justify-center cursor-pointer hover:bg-stashbox-orange/80 transition-colors"
            onClick={() => navigate("/profile")}
          >
            <User className="w-5 h-5 text-stashbox-text" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-stashbox-text leading-tight">
          {t('header.greeting', { name: user.name })} <br />
          {t('header.subtitle')} <br />
          {t('header.subtitle2')}
        </h1>
        
        <div className="mt-6 p-4 bg-stashbox-mint rounded-stashbox">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stashbox-text/80 mb-1">
                {t('header.totalSaved')}
              </p>
              <p className="text-3xl font-bold text-stashbox-text">
                ${user.totalSaved}
              </p>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                alt="Stashie celebrating your savings" 
                className="w-16 h-16 animate-bounce-gentle hover:animate-sparkle cursor-pointer"
                title={t('header.celebratingTitle')}
                onClick={() => {
                  // Trigger sparkle animation and haptic feedback
                  if (navigator.vibrate) {
                    navigator.vibrate([50, 100, 50]);
                  }
                }}
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-stashbox-orange rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
