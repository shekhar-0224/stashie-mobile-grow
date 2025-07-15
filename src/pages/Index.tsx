
import { useState } from "react";
import Header from "@/components/Header";
import SavingsGrid from "@/components/SavingsGrid";
import GenieModeBanner from "@/components/GenieModeBanner";
import AllJarsModal from "@/components/AllJarsModal";

const Index = () => {
  const [showAllJars, setShowAllJars] = useState(false);

  return (
    <div className="min-h-screen bg-stashbox-cream">
      <div className="max-w-md mx-auto bg-stashbox-cream animate-slide-up">
        <Header onTotalSavedClick={() => setShowAllJars(true)} />
        <SavingsGrid />
        <div className="py-6">
          <GenieModeBanner />
        </div>
        <div className="h-8"></div>
      </div>
      
      {/* All Jars Modal from Header click */}
      <AllJarsModal
        isOpen={showAllJars}
        onClose={() => setShowAllJars(false)}
      />
    </div>
  );
};

export default Index;
