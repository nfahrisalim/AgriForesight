import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StaticDashboardSection } from "@/components/StaticDashboardSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Footer } from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <StaticDashboardSection />
      <HowItWorksSection />
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
