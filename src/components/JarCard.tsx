import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Leaf, Users, Trophy } from "lucide-react";

interface JarCardProps {
  type: "savings" | "shared" | "betting";
  title: string;
  subtitle: string;
  goal?: number;
  current?: number;
  apy?: number;
  participants?: number;
  onAction: () => void;
  animationDelay?: number;
}

const JarCard = ({
  type,
  title,
  subtitle,
  goal = 1000,
  current = 230,
  apy = 7.2,
  participants = 1,
  onAction,
  animationDelay = 0
}: JarCardProps) => {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  
  const progress = (current / goal) * 100;
  const waterHeight = Math.min(progress, 100);

  const getJarColor = () => {
    switch (type) {
      case "savings": return "hsl(var(--stashbox-mint))";
      case "shared": return "hsl(var(--stashbox-blue))";
      case "betting": return "hsl(var(--stashbox-orange))";
      default: return "hsl(var(--stashbox-mint))";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "savings": return <Leaf className="w-4 h-4" />;
      case "shared": return <Users className="w-4 h-4" />;
      case "betting": return <Trophy className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
      style={{ 
        animationDelay: `${animationDelay}ms`,
        background: `linear-gradient(135deg, ${getJarColor()}15, white)` 
      }}
    >
      {/* Jar Illustration */}
      <div className="relative w-full h-32 mb-3 flex items-center justify-center">
        {/* Jar Container */}
        <div className="relative w-20 h-24">
          {/* Jar Outline */}
          <div 
            className="absolute inset-0 rounded-b-2xl rounded-t-lg border-2 border-gray-300"
            style={{ 
              background: 'linear-gradient(180deg, transparent 20%, rgba(135, 206, 235, 0.3) 100%)',
              clipPath: `polygon(0 ${100 - waterHeight}%, 100% ${100 - waterHeight}%, 100% 100%, 0% 100%)`
            }}
          />
          
          {/* Jar Lid */}
          <div className="absolute -top-1 left-1 right-1 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg border border-gray-400" />
          
          {/* Plant on Top */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
              {getIcon()}
            </div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full opacity-70" />
          </div>

          {/* Coins/Progress Inside */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          </div>

          {/* Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
        </div>

        {/* APY Badge */}
        <div className="absolute top-0 right-0 bg-green-100 px-2 py-1 rounded-full">
          <span className="text-xs font-semibold text-green-700">+{apy}%</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
      
      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">{Math.round(progress)}% of ${goal} goal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              background: getJarColor()
            }}
          />
        </div>
      </div>

      {/* Participants (for shared jars) */}
      {type === "shared" && participants > 1 && (
        <div className="flex items-center mb-3">
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(participants, 3) }).map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs">
                {i + 1}
              </div>
            ))}
            {participants > 3 && (
              <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">
                +{participants - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={onAction}
        className={`w-full transition-all duration-200 ${
          isPressed ? 'scale-95' : 'scale-100'
        }`}
        style={{ 
          background: getJarColor(),
          color: 'white'
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <Leaf className="w-4 h-4 mr-2" />
        Grow the Jar
      </Button>
    </div>
  );
};

export default JarCard;