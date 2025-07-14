
import SavingsCard from "./SavingsCard";
import { toast } from "@/hooks/use-toast";

const SavingsGrid = () => {
  const handleQuickSave = () => {
    toast({
      title: "QuickSave Selected",
      description: "Starting your 30-day savings plan with 4.5% APY!",
    });
  };

  const handleSafeStack = () => {
    toast({
      title: "SafeStack Selected", 
      description: "Starting your 90-day savings plan with 6.5% APY!",
    });
  };

  const handleGrowFund = () => {
    toast({
      title: "GrowFund Selected",
      description: "Starting your 180+ day savings plan with 8.0% APY!",
    });
  };

  return (
    <div className="px-6 py-4 space-y-4">
      <SavingsCard
        title="QuickSave"
        description="Fixed 4.5% APY · 30 days"
        background="#C2E9F7"
        onAction={handleQuickSave}
        animationDelay={200}
      />
      
      <SavingsCard
        title="SafeStack"
        description="Fixed 6.5% APY · 90 days"
        background="#AEE6C5"
        onAction={handleSafeStack}
        animationDelay={400}
      />
      
      <SavingsCard
        title="GrowFund"
        description="Fixed 8.0% APY · 180+ days"
        background="#F9B572"
        onAction={handleGrowFund}
        animationDelay={600}
      />
    </div>
  );
};

export default SavingsGrid;
