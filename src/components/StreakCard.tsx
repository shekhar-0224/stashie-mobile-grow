
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
    <div className="bg-gradient-to-br from-red-500 via-red-400 to-orange-400 p-5 rounded-stashbox animate-slide-up shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white animate-bounce-gentle" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {streak.streakDays} Day Streak!
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Keep it going! 🔥
              </p>
            </div>
          </div>
          <div className="text-3xl animate-bounce-gentle">🎯</div>
        </div>
        
        <div className="relative w-full bg-white/20 rounded-full h-3 mb-3 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-white rounded-full transition-all duration-1000 animate-fluid-fill shadow-inner"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-white font-semibold">
          {streak.nextBadgeAt - streak.streakDays} days to next badge! 🏆
        </p>
      </div>
    </div>
  );
};

export default StreakCard;
