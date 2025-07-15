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
            src="/lovable-uploads/19cb9961-c93d-4b01-870d-0ca39ac222ee.png" 
            alt="Conservative"
            className="w-8 h-8 object-contain"
            style={{ 
              filter: 'hue-rotate(0deg) saturate(1.2)'
            }}
          />
        ),
        apy: 3.0 
      },
      { 
        name: 'Moderate', 
        icon: (
          <img 
            src="/lovable-uploads/19cb9961-c93d-4b01-870d-0ca39ac222ee.png" 
            alt="Moderate"
            className="w-8 h-8 object-contain"
            style={{ 
              filter: 'hue-rotate(20deg) saturate(1.3) brightness(1.1)'
            }}
          />
        ),
        apy: 6.0 
      },
      { 
        name: 'Aggressive', 
        icon: (
          <img 
            src="/lovable-uploads/19cb9961-c93d-4b01-870d-0ca39ac222ee.png" 
            alt="Aggressive"
            className="w-8 h-8 object-contain"
            style={{ 
              filter: 'hue-rotate(300deg) saturate(1.4) brightness(1.1)'
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
    <div className="space-y-2">
      <Label className="text-xs font-medium text-white flex items-center gap-2">
        <Target className="w-3 h-3" />
        Growth Strategy
      </Label>
      
      <div className="bg-white/10 rounded-stashbox p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {currentRiskData.icon}
            <div>
              <div className="text-sm font-medium text-white">{currentRiskData.name}</div>
              <div className="text-xs text-white/70">{currentRiskData.apy.toFixed(1)}% APY</div>
            </div>
          </div>
        </div>
        
        <div 
          className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full cursor-pointer"
          onClick={handleSliderClick}
        >
          {/* Middle point marker for moderate */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-white/40" style={{ left: '50%' }}></div>
          
          {/* Slider handle */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out"
            style={{ left: `calc(${((riskLevel - 1) / 2) * 100}% - 6px)` }}
          >
            <div className="w-3 h-3 bg-white rounded-full shadow-lg border border-white/30 hover:scale-110 transition-transform duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStrategySelector;
