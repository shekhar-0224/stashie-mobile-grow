
import { Label } from "@/components/ui/label";
import { Target, TrendingDown, TrendingUp, BarChart3 } from "lucide-react";

interface GrowthStrategySelectorProps {
  riskLevel: number;
  onRiskLevelChange: (level: number) => void;
}

const GrowthStrategySelector = ({ riskLevel, onRiskLevelChange }: GrowthStrategySelectorProps) => {
  const getRiskData = (level: number) => {
    const riskOptions = [
      { 
        name: 'Conservative', 
        icon: <TrendingDown className="w-8 h-8 text-green-500" />,
        apy: 3.0 
      },
      { 
        name: 'Moderate', 
        icon: <BarChart3 className="w-8 h-8 text-yellow-500" />,
        apy: 6.0 
      },
      { 
        name: 'Aggressive', 
        icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
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
    <div className="space-y-2">
      <Label className="text-xs font-medium text-white flex items-center gap-2">
        <Target className="w-3 h-3" />
        Growth Strategy
      </Label>
      
      <div className="bg-white/10 rounded-stashbox p-3 space-y-3">
        <div className="text-center">
          <div className="mb-2 flex justify-center">{currentRiskData.icon}</div>
          <div className="text-sm font-medium text-white">{currentRiskData.name}</div>
          <div className="text-xs text-white/70">{currentRiskData.apy.toFixed(1)}% Expected APY</div>
        </div>
        
        <div 
          className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full cursor-pointer"
          onClick={handleSliderClick}
        >
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
            style={{ left: `${((riskLevel - 1) / 2) * 100}%` }}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStrategySelector;
