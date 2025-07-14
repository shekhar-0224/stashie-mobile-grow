
import Header from "@/components/Header";
import SavingsGrid from "@/components/SavingsGrid";
import GenieModeBanner from "@/components/GenieModeBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-stashbox-cream">
      <div className="max-w-md mx-auto bg-stashbox-cream animate-slide-up">
        <Header />
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
