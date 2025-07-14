
import { useState } from "react";
import SavingsCard from "./SavingsCard";
import SavingsModal from "./SavingsModal";
import { toast } from "@/hooks/use-toast";

const SavingsGrid = () => {
  const [openModal, setOpenModal] = useState<"quick" | "safe" | "grow" | "custom" | null>(null);

  const handleQuickSave = () => {
    setOpenModal("quick");
  };

  const handleSafeStack = () => {
    setOpenModal("safe");
  };

  const handleGrowFund = () => {
    setOpenModal("grow");
  };

  const handleCustomJar = () => {
    setOpenModal("custom");
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className="px-6 py-4 space-y-4">
        {/* Custom Goal Jar - moved to top */}
        <SavingsCard
          title="🎯 Goal Jar (Custom)"
          subtitle="Custom Goal Jar"
          caption="Create custom goal like 'PS5', set target"
          background="hsl(var(--stashbox-purple))"
          onAction={handleCustomJar}
          animationDelay={200}
          isGoalJar={true}
        />
        
        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-3">
          <SavingsCard
            title="QuickSave"
            subtitle="QuickSave · 30 days"
            caption="Fixed 4.5% APY"
            background="hsl(var(--stashbox-blue))"
            onAction={handleQuickSave}
            animationDelay={400}
            progress={45}
            progressColor="hsl(var(--stashbox-mint))"
            compact={true}
          />
          
          <SavingsCard
            title="SafeStack"
            subtitle="SafeStack · 90 days"
            caption="Fixed 6.5% APY"
            background="hsl(var(--stashbox-mint))"
            onAction={handleSafeStack}
            animationDelay={600}
            progress={72}
            progressColor="hsl(var(--stashbox-orange))"
            compact={true}
          />
          
          <SavingsCard
            title="GrowFund"
            subtitle="GrowFund · 180+ days"
            caption="Fixed 8.0% APY"
            background="hsl(var(--stashbox-orange))"
            onAction={handleGrowFund}
            animationDelay={800}
            progress={28}
            progressColor="hsl(var(--stashbox-yellow))"
            compact={true}
          />
          
          <SavingsCard
            title="Emergency"
            subtitle="Emergency Fund"
            caption="High liquidity 2.5% APY"
            background="hsl(var(--stashbox-yellow))"
            onAction={() => setOpenModal("safe")}
            animationDelay={1000}
            progress={15}
            progressColor="hsl(var(--stashbox-mint))"
            compact={true}
          />
        </div>
      </div>

      {/* Modals */}
      <SavingsModal
        isOpen={openModal === "quick"}
        onClose={closeModal}
        type="quick"
      />
      <SavingsModal
        isOpen={openModal === "safe"}
        onClose={closeModal}
        type="safe"
      />
      <SavingsModal
        isOpen={openModal === "grow"}
        onClose={closeModal}
        type="grow"
      />
      <SavingsModal
        isOpen={openModal === "custom"}
        onClose={closeModal}
        type="custom"
      />
    </>
  );
};

export default SavingsGrid;
