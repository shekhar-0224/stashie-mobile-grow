
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Leaf, TrendingUp, Copy, Share, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface CreatedJar {
  id: string;
  name: string;
  type: 'saving' | 'betting';
  totalDeposited: number;
  progress: number;
  color: string;
  isShared?: boolean;
  interestEarned: number;
}

interface AllJarsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllJarsModal = ({ isOpen, onClose }: AllJarsModalProps) => {
  const { t } = useTranslation();
  const [showActions, setShowActions] = useState<string | null>(null);

  // Mock data - replace with actual data
  const allJars: CreatedJar[] = [
    {
      id: '1',
      name: 'Summer Vacation',
      type: 'saving',
      totalDeposited: 1250.75,
      progress: 68,
      color: 'hsl(var(--stashbox-mint))',
      isShared: false,
      interestEarned: 15.25
    },
    {
      id: '2',
      name: 'Crypto Trading',
      type: 'betting',
      totalDeposited: 850.50,
      progress: 45,
      color: 'hsl(var(--stashbox-orange))',
      isShared: true,
      interestEarned: 42.75
    },
    {
      id: '3',
      name: 'Emergency Fund',
      type: 'saving',
      totalDeposited: 2150.25,
      progress: 82,
      color: 'hsl(var(--stashbox-blue))',
      isShared: false,
      interestEarned: 28.90
    },
    {
      id: '4',
      name: 'New Car',
      type: 'saving',
      totalDeposited: 3420.00,
      progress: 34,
      color: 'hsl(var(--stashbox-yellow))',
      isShared: false,
      interestEarned: 67.80
    },
    {
      id: '5',
      name: 'Wedding Fund',
      type: 'saving',
      totalDeposited: 5670.30,
      progress: 91,
      color: 'hsl(var(--stashbox-mint))',
      isShared: true,
      interestEarned: 125.45
    }
  ];

  const totalSaved = allJars.reduce((sum, jar) => sum + jar.totalDeposited, 0);
  const totalInterest = allJars.reduce((sum, jar) => sum + jar.interestEarned, 0);

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-stashbox-text">All My Jars</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Summary Card */}
          <Card className="p-4 bg-gradient-to-r from-stashbox-mint/20 to-stashbox-blue/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-stashbox-text/60">Total Saved</p>
                <p className="text-lg font-bold text-stashbox-text">${totalSaved.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-stashbox-text/60">Interest Earned</p>
                <p className="text-lg font-bold text-green-600">${totalInterest.toFixed(2)}</p>
              </div>
            </div>
          </Card>
          
          {/* All Jars */}
          <div className="space-y-3">
            {allJars.map((jar) => (
              <Card 
                key={jar.id} 
                className="p-4 relative"
                style={{ backgroundColor: `${jar.color}15`, borderColor: `${jar.color}30` }}
              >
                <div className="space-y-3">
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
                        <p className="text-xs text-stashbox-text/60 capitalize">{jar.type} Jar</p>
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
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-stashbox-text/60">Deposited</p>
                      <p className="font-medium text-stashbox-text">${jar.totalDeposited.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-stashbox-text/60">Interest</p>
                      <p className="font-medium text-green-600">+${jar.interestEarned.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-stashbox-text/60 mb-1">
                      <span>Progress</span>
                      <span>{jar.progress}%</span>
                    </div>
                    <div className="w-full bg-white/40 rounded-full h-2">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: jar.color,
                          width: `${jar.progress}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllJarsModal;
