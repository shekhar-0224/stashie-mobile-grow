
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { Leaf, TrendingUp, MoreHorizontal, Copy, Share, Trash2 } from "lucide-react";
import { useState } from "react";

interface CreatedJar {
  id: string;
  name: string;
  type: 'saving' | 'betting';
  totalDeposited: number;
  progress: number;
  color: string;
  isShared?: boolean;
}

interface CreatedJarsSectionProps {
  onViewAll: () => void;
}

const CircularProgress = ({ progress, color, size = 70 }: { progress: number; color: string; size?: number }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-stashbox-text">{progress}%</span>
      </div>
    </div>
  );
};

const CreatedJarsSection = ({ onViewAll }: CreatedJarsSectionProps) => {
  const { t } = useTranslation();
  const [showActions, setShowActions] = useState<string | null>(null);

  // Mock data - only show first 2 items
  const createdJars: CreatedJar[] = [
    {
      id: '1',
      name: 'Summer Vacation',
      type: 'saving',
      totalDeposited: 1250.75,
      progress: 68,
      color: '#10B981',
      isShared: false
    },
    {
      id: '2',
      name: 'Crypto Trading',
      type: 'betting',
      totalDeposited: 850.50,
      progress: 45,
      color: '#F59E0B',
      isShared: true
    }
  ];

  const handleCopyLink = (jarId: string) => {
    navigator.clipboard.writeText(`https://stashbox.app/jar/${jarId}`);
    setShowActions(null);
  };

  const handleShare = (jarId: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my Stashbox jar!',
        url: `https://stashbox.app/jar/${jarId}`
      });
    }
    setShowActions(null);
  };

  const handleDelete = (jarId: string) => {
    // Handle delete logic
    setShowActions(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-stashbox-text">Ongoing Jars</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll}
          className="text-stashbox-text font-semibold hover:text-stashbox-text hover:bg-stashbox-mint/20 px-4 py-2 rounded-full"
        >
          View All →
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {createdJars.map((jar) => (
          <Card 
            key={jar.id} 
            className="p-5 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative rounded-3xl"
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Circular Progress */}
              <div className="relative">
                <CircularProgress progress={jar.progress} color={jar.color} size={70} />
                <div 
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: jar.color }}
                >
                  {jar.type === 'saving' ? (
                    <Leaf className="w-4 h-4 text-white" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-bold text-stashbox-text text-base leading-tight mb-1">{jar.name}</h4>
                <p className="text-sm text-stashbox-text font-semibold opacity-80">
                  ${jar.totalDeposited.toLocaleString()}
                </p>
              </div>
              
              {jar.isShared && (
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowActions(showActions === jar.id ? null : jar.id)}
                    className="w-7 h-7 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-md"
                  >
                    <MoreHorizontal className="w-4 h-4 text-stashbox-text" />
                  </Button>
                  
                  {showActions === jar.id && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border p-1 z-10 min-w-[130px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(jar.id)}
                        className="w-full justify-start px-3 py-2 h-9 text-sm rounded-lg"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(jar.id)}
                        className="w-full justify-start px-3 py-2 h-9 text-sm rounded-lg"
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(jar.id)}
                        className="w-full justify-start px-3 py-2 h-9 text-sm text-red-600 hover:text-red-700 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatedJarsSection;
