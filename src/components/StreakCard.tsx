
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
          {/* Prominent Flame Icon */}
          <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" />
          </div>
          
          <div className="text-white">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold drop-shadow-md">{streak.streakDays}</span>
              <span className="text-sm font-semibold opacity-90 drop-shadow-sm">day streak!</span>
            </div>
          </div>
          
          {/* Fire Emoji for extra emphasis */}
          <div className="text-xl animate-bounce">🔥</div>
        </div>
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 to-pink-400/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default StreakCard;
