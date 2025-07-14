
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
        <SavingsCard
          title="QuickSave"
          subtitle="QuickSave · 30 days"
          caption="Fixed 4.5% APY"
          background="#C2E9F7"
          onAction={handleQuickSave}
          animationDelay={200}
          progress={45}
          progressColor="#AEE6C5"
        />
        
        <SavingsCard
          title="SafeStack"
          subtitle="SafeStack · 90 days"
          caption="Fixed 6.5% APY"
          background="#AEE6C5"
          onAction={handleSafeStack}
          animationDelay={400}
          progress={72}
          progressColor="#F9B572"
        />
        
        <SavingsCard
          title="GrowFund"
          subtitle="GrowFund · 180+ days"
          caption="Fixed 8.0% APY"
          background="#F9B572"
          onAction={handleGrowFund}
          animationDelay={600}
          progress={28}
          progressColor="#FEE191"
        />

        <SavingsCard
          title="🎯 Goal Jar (Custom)"
          subtitle="Custom Goal Jar"
          caption="Create custom goal like 'PS5', set target"
          background="#E0E4F1"
          onAction={handleCustomJar}
          animationDelay={800}
          isGoalJar={true}
        />
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
