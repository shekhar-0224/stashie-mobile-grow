
import Header from "@/components/Header";
import SavingsGrid from "@/components/SavingsGrid";
import GenieModeBanner from "@/components/GenieModeBanner";
import StreakCard from "@/components/StreakCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-stashbox-cream">
      <div className="max-w-md mx-auto bg-stashbox-cream animate-slide-up">
        <Header />
        <div className="px-6 mb-4">
          <StreakCard />
        </div>
        <SavingsGrid />
        <div className="py-6">
          <GenieModeBanner />
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Index;
