
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";

interface GrowthStrategySelectorProps {
  riskLevel: number;
  onRiskLevelChange: (level: number) => void;
}

const GrowthStrategySelector = ({ riskLevel, onRiskLevelChange }: GrowthStrategySelectorProps) => {
  const getRiskData = (level: number) => {
    const riskOptions = [
      { 
        name: 'Conservative', 
        icon: (
          <img 
            src="/lovable-uploads/921a4dfb-6295-458a-9bc4-82a2e834dbf4.png" 
            alt="Conservative"
            className="w-6 h-6 object-contain"
            style={{ 
              clipPath: 'polygon(0% 0%, 33% 0%, 33% 100%, 0% 100%)'
            }}
          />
        ),
        apy: 3.0 
      },
      { 
        name: 'Moderate', 
        icon: (
          <img 
            src="/lovable-uploads/921a4dfb-6295-458a-9bc4-82a2e834dbf4.png" 
            alt="Moderate"
            className="w-6 h-6 object-contain"
            style={{ 
              clipPath: 'polygon(33% 0%, 66% 0%, 66% 100%, 33% 100%)'
            }}
          />
        ),
        apy: 6.0 
      },
      { 
        name: 'Aggressive', 
        icon: (
          <img 
            src="/lovable-uploads/921a4dfb-6295-458a-9bc4-82a2e834dbf4.png" 
            alt="Aggressive"
            className="w-6 h-6 object-contain"
            style={{ 
              clipPath: 'polygon(66% 0%, 100% 0%, 100% 100%, 66% 100%)'
            }}
          />
        ),
        apy: 9.0 
      }
    ];
    return riskOptions[level - 1] || riskOptions[1];
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    // Map to 3 levels
    if (percentage < 0.33) {
      onRiskLevelChange(1);
    } else if (percentage < 0.67) {
      onRiskLevelChange(2);
    } else {
      onRiskLevelChange(3);
    }
  };

  const currentRiskData = getRiskData(riskLevel);

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium text-white flex items-center gap-2">
        <Target className="w-3 h-3" />
        Growth Strategy
      </Label>
      
      <div className="bg-white/10 rounded-stashbox p-4 space-y-4">
        <div className="text-center">
          <div className="mb-3 flex justify-center">{currentRiskData.icon}</div>
          <div className="text-sm font-medium text-white">{currentRiskData.name}</div>
          <div className="text-xs text-white/70">{currentRiskData.apy.toFixed(1)}% Expected APY</div>
        </div>
        
        <div 
          className="relative h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full cursor-pointer shadow-inner"
          onClick={handleSliderClick}
        >
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out"
            style={{ left: `calc(${((riskLevel - 1) / 2) * 100}% - 8px)` }}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-white/50 hover:scale-110 transition-transform duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStrategySelector;
