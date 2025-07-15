
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Flame } from "lucide-react";

const StreakCard = () => {
  const { t } = useTranslation();
  const [streak] = useState({
    streakDays: 5,
    nextBadgeAt: 7
  });

  return (
    <div className="flex justify-center mb-6">
      {/* Duolingo-style Streak Badge */}
      <div 
        className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative"
        style={{
          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            <Flame className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div className="text-white">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{streak.streakDays}</span>
              <span className="text-sm font-semibold opacity-90">day streak!</span>
            </div>
          </div>
          <div className="text-xl animate-bounce">🔥</div>
        </div>
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 to-pink-400/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default StreakCard;
