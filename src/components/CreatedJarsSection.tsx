
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
      color: 'hsl(var(--stashbox-mint))',
      isShared: false
    },
    {
      id: '2',
      name: 'Crypto Trading',
      type: 'betting',
      totalDeposited: 850.50,
      progress: 45,
      color: 'hsl(var(--stashbox-orange))',
      isShared: true
    },
    {
      id: '3',
      name: 'Emergency Fund',
      type: 'saving',
      totalDeposited: 2150.25,
      progress: 82,
      color: 'hsl(var(--stashbox-blue))',
      isShared: false
    }
  ];

  const visibleJars = createdJars.slice(0, 3);

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
        <h3 className="text-lg font-semibold text-stashbox-text">Ongoing Jars</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll}
          className="text-stashbox-text/60 hover:text-stashbox-text"
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {visibleJars.map((jar) => (
          <Card 
            key={jar.id} 
            className="p-4 relative"
            style={{ backgroundColor: `${jar.color}20`, borderColor: `${jar.color}40` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: jar.color }}
                >
                  {jar.type === 'saving' ? (
                    <Leaf className="w-5 h-5 text-white" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-stashbox-text">{jar.name}</h4>
                  <p className="text-sm text-stashbox-text/60">
                    ${jar.totalDeposited.toFixed(2)} saved
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-stashbox-text">{jar.progress}%</p>
                  <div className="w-16 h-2 bg-white/30 rounded-full mt-1">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: jar.color,
                        width: `${jar.progress}%`
                      }}
                    />
                  </div>
                </div>
                
                {jar.isShared && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowActions(showActions === jar.id ? null : jar.id)}
                      className="w-8 h-8 p-0"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    
                    {showActions === jar.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border p-1 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyLink(jar.id)}
                          className="w-full justify-start px-2 py-1 h-8"
                        >
                          <Copy className="w-3 h-3 mr-2" />
                          Copy Link
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(jar.id)}
                          className="w-full justify-start px-2 py-1 h-8"
                        >
                          <Share className="w-3 h-3 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(jar.id)}
                          className="w-full justify-start px-2 py-1 h-8 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatedJarsSection;
