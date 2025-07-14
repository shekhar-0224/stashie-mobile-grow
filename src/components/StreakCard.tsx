import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Flame } from "lucide-react";

const StreakCard = () => {
  const { t } = useTranslation();
  const [streak] = useState({
    streakDays: 5,
    nextBadgeAt: 7
  });

  const progressPercent = (streak.streakDays / streak.nextBadgeAt) * 100;

  return (
    <div className="bg-stashbox-yellow p-4 rounded-stashbox animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-stashbox-text animate-bounce-gentle" />
          <h3 className="text-lg font-semibold text-stashbox-text">
            {t('streak.streak', { days: streak.streakDays })}
          </h3>
        </div>
        <div className="text-2xl">🔥</div>
      </div>
      
      <div className="relative w-full bg-stashbox-cream/50 rounded-full h-3 mb-2">
        <div 
          className="absolute top-0 left-0 h-full bg-stashbox-orange rounded-full transition-all duration-1000 animate-fluid-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-stashbox-text/80">
        {t('streak.nextBadge', { days: streak.nextBadgeAt })}
      </p>
    </div>
  );
};

export default StreakCard;