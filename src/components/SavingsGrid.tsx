import { useState } from "react";
import SavingsCard from "./SavingsCard";
import SavingsModal from "./SavingsModal";
import CustomJarSection from "./CustomJarSection";
import CreatedJarsSection from "./CreatedJarsSection";
import AllJarsModal from "./AllJarsModal";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

const SavingsGrid = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<"quick" | "safe" | "grow" | "custom" | "betting" | null>(null);
  const [showAllJars, setShowAllJars] = useState(false);

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

  const handleBettingJar = () => {
    setOpenModal("betting");
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className="px-6 py-4 space-y-6">
        {/* Custom Jar Creation Section */}
        <CustomJarSection 
          onSavingJar={handleCustomJar}
          onBettingJar={handleBettingJar}
        />
        
        {/* Created Jars Section */}
        <CreatedJarsSection 
          onViewAll={() => setShowAllJars(true)}
        />
        
        {/* 2x2 Grid Layout for Predefined Jars */}
        <div>
          <h3 className="text-lg font-semibold text-stashbox-text mb-4">Quick Start Jars</h3>
          <div className="grid grid-cols-2 gap-3">
            <SavingsCard
              title={t('savings.quickSave')}
              subtitle={t('savings.quickSaveSubtitle')}
              caption={t('savings.quickSaveCaption')}
              background="hsl(var(--stashbox-blue))"
              onAction={handleQuickSave}
              animationDelay={400}
              progress={45}
              progressColor="hsl(var(--stashbox-mint))"
              compact={true}
              totalDeposited={124.50}
              interestEarned={2.34}
            />
            
            <SavingsCard
              title={t('savings.safeStack')}
              subtitle={t('savings.safeStackSubtitle')}
              caption={t('savings.safeStackCaption')}
              background="hsl(var(--stashbox-mint))"
              onAction={handleSafeStack}
              animationDelay={600}
              progress={72}
              progressColor="hsl(var(--stashbox-orange))"
              compact={true}
              totalDeposited={485.75}
              interestEarned={12.67}
            />
            
            <SavingsCard
              title={t('savings.growFund')}
              subtitle={t('savings.growFundSubtitle')}
              caption={t('savings.growFundCaption')}
              background="hsl(var(--stashbox-orange))"
              onAction={handleGrowFund}
              animationDelay={800}
              progress={28}
              progressColor="hsl(var(--stashbox-yellow))"
              compact={true}
              totalDeposited={892.25}
              interestEarned={45.89}
            />
            
            <SavingsCard
              title={t('savings.emergency')}
              subtitle={t('savings.emergencySubtitle')}
              caption={t('savings.emergencyCaption')}
              background="hsl(var(--stashbox-yellow))"
              onAction={() => setOpenModal("safe")}
              animationDelay={1000}
              progress={15}
              progressColor="hsl(var(--stashbox-mint))"
              compact={true}
              totalDeposited={67.89}
              interestEarned={0.89}
            />
          </div>
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
      <SavingsModal
        isOpen={openModal === "betting"}
        onClose={closeModal}
        type="betting"
      />
      
      {/* All Jars Modal */}
      <AllJarsModal
        isOpen={showAllJars}
        onClose={() => setShowAllJars(false)}
      />
    </>
  );
};

export default SavingsGrid;
