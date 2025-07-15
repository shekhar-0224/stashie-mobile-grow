import { useState } from "react";
import JarCard from "./JarCard";
import JarModal from "./JarModal";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

const SavingsGrid = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<"savings" | "shared" | "betting" | null>(null);

  const handleSavingsJar = () => {
    setOpenModal("savings");
  };

  const handleSharedJar = () => {
    setOpenModal("shared");
  };

  const handleBettingJar = () => {
    setOpenModal("betting");
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className="px-4 py-4 space-y-4">
        {/* Three Jar Types */}
        <div className="grid grid-cols-1 gap-4">
          {/* Savings Jar */}
          <JarCard
            type="savings"
            title="💰 Savings Jar"
            subtitle="Grow your crypto with smart yield strategies"
            goal={1000}
            current={450}
            apy={8.2}
            onAction={handleSavingsJar}
            animationDelay={200}
          />
          
          {/* Shared Jar */}
          <JarCard
            type="shared"
            title="👥 Shared Jar"
            subtitle="Save together with friends and family"
            goal={600}
            current={230}
            apy={7.2}
            participants={3}
            onAction={handleSharedJar}
            animationDelay={400}
          />
          
          {/* Betting Jar */}
          <JarCard
            type="betting"
            title="🏆 Betting Jar"
            subtitle="Create challenges and compete"
            goal={500}
            current={125}
            apy={15.5}
            participants={5}
            onAction={handleBettingJar}
            animationDelay={600}
          />
        </div>
      </div>

      {/* Modals */}
      <JarModal
        isOpen={openModal === "savings"}
        onClose={closeModal}
        type="savings"
      />
      <JarModal
        isOpen={openModal === "shared"}
        onClose={closeModal}
        type="shared"
      />
      <JarModal
        isOpen={openModal === "betting"}
        onClose={closeModal}
        type="betting"
      />
    </>
  );
};

export default SavingsGrid;