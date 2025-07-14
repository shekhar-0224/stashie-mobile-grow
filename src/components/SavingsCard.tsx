
import { Button } from "@/components/ui/button";

interface SavingsCardProps {
  title: string;
  description: string;
  background: string;
  onAction: () => void;
  animationDelay?: number;
}

const SavingsCard = ({ 
  title, 
  description, 
  background, 
  onAction, 
  animationDelay = 0 
}: SavingsCardProps) => {
  return (
    <div 
      className={`p-6 rounded-stashbox animate-fade-in transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
      style={{ 
        backgroundColor: background,
        animationDelay: `${animationDelay}ms`
      }}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-stashbox-text mb-2">
            {title}
          </h3>
          <p className="text-stashbox-text/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        <Button 
          onClick={onAction}
          className="w-full bg-white text-stashbox-text hover:bg-white/90 font-medium py-3 rounded-stashbox transition-all duration-200 transform hover:scale-105"
        >
          Start Saving
        </Button>
      </div>
    </div>
  );
};

export default SavingsCard;
