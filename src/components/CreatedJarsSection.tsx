
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

const CircularProgress = ({ progress, color, size = 60 }: { progress: number; color: string; size?: number }) => {
  const radius = (size - 8) / 2;
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
          strokeWidth="4"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-stashbox-text">{progress}%</span>
      </div>
    </div>
  );
};

const CreatedJarsSection = ({ onViewAll }: CreatedJarsSectionProps) => {
  const { t } = useTranslation();
  const [showActions, setShowActions] = useState<string | null>(null);

  // Mock data - replace with actual data from your state management
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
    },
    {
      id: '3',
      name: 'Emergency Fund',
      type: 'saving',
      totalDeposited: 2150.25,
      progress: 82,
      color: '#3B82F6',
      isShared: false
    },
    {
      id: '4',
      name: 'House Down Payment',
      type: 'saving',
      totalDeposited: 50452.00,
      progress: 25,
      color: '#8B5CF6',
      isShared: false
    },
    {
      id: '5',
      name: 'Wedding Fund',
      type: 'saving',
      totalDeposited: 5670.30,
      progress: 91,
      color: '#EC4899',
      isShared: true
    },
    {
      id: '6',
      name: 'New Car',
      type: 'saving',
      totalDeposited: 3420.00,
      progress: 34,
      color: '#06B6D4',
      isShared: false
    }
  ];

  const visibleJars = createdJars.slice(0, 6);

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
      
      <div className="grid grid-cols-2 gap-3">
        {visibleJars.map((jar) => (
          <Card 
            key={jar.id} 
            className="p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative"
          >
            <div className="flex flex-col items-center space-y-3">
              {/* Circular Progress */}
              <div className="relative">
                <CircularProgress progress={jar.progress} color={jar.color} size={50} />
                <div 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: jar.color }}
                >
                  {jar.type === 'saving' ? (
                    <Leaf className="w-3 h-3 text-white" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-bold text-stashbox-text text-sm leading-tight">{jar.name}</h4>
                <p className="text-xs text-stashbox-text font-semibold opacity-70 mt-1">
                  ${jar.totalDeposited.toLocaleString()}
                </p>
              </div>
              
              {jar.isShared && (
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowActions(showActions === jar.id ? null : jar.id)}
                    className="w-6 h-6 p-0 bg-white/60 hover:bg-white/80 rounded-full"
                  >
                    <MoreHorizontal className="w-3 h-3 text-stashbox-text" />
                  </Button>
                  
                  {showActions === jar.id && (
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border p-1 z-10 min-w-[120px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(jar.id)}
                        className="w-full justify-start px-2 py-1 h-8 text-xs"
                      >
                        <Copy className="w-3 h-3 mr-2" />
                        Copy Link
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(jar.id)}
                        className="w-full justify-start px-2 py-1 h-8 text-xs"
                      >
                        <Share className="w-3 h-3 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(jar.id)}
                        className="w-full justify-start px-2 py-1 h-8 text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3 mr-2" />
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
