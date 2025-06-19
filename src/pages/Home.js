import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StaticDashboardSection } from "@/components/StaticDashboardSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FoodSecuritySection } from "@/components/FoodSecuritySection";
import { Footer } from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
export function Home() {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300", children: [_jsx(Navigation, {}), _jsx(HeroSection, {}), _jsx(StatsSection, {}), _jsx(FeaturesSection, {}), _jsx(HowItWorksSection, {}), _jsx(FoodSecuritySection, {}), _jsx(StaticDashboardSection, {}), _jsx(Footer, {}), _jsx(FloatingActionButton, {})] }));
}
