// src/components/Navigation.tsx

import { useState } from "react";
import { Sun, Moon, Leaf, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#F9FAF4]/90 dark:bg-[#29792D]/90 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-green-700/50 transition-colors duration-300 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-12 h-12 bg-[#4CAF50] dark:bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
              <Leaf className="text-white dark:text-[#4CAF50] text-xl transition-colors duration-300" />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:scale-105 transition-transform duration-300">
              AgriForesight
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => scrollToSection("home")} className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:text-[#4CAF50] dark:hover:text-white font-semibold rounded-lg transition-colors duration-200">Home</button>
            <button onClick={() => scrollToSection("features")} className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:text-[#4CAF50] dark:hover:text-white font-semibold rounded-lg transition-colors duration-200">Fitur</button>
            <button onClick={() => scrollToSection("dashboard")} className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:text-[#4CAF50] dark:hover:text-white font-semibold rounded-lg transition-colors duration-200">Dashboard</button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative w-12 h-12 rounded-full bg-gray-200/70 dark:bg-green-800/70 hover:bg-gray-300 dark:hover:bg-green-700 transition-colors duration-300 transform hover:scale-110">
              <Sun className={`h-6 w-6 text-yellow-500 transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
              <Moon className={`absolute h-6 w-6 text-blue-300 transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative md:hidden w-12 h-12 rounded-full bg-gray-200/70 dark:bg-green-800/70">
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-800 dark:text-gray-200" /> : <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-green-700/50">
            <div className="flex flex-col space-y-2">
              <button onClick={() => scrollToSection("home")} className="text-left px-4 py-3 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-green-700 font-semibold rounded-lg transition-colors duration-200">Home</button>
              <button onClick={() => scrollToSection("features")} className="text-left px-4 py-3 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-green-700 font-semibold rounded-lg transition-colors duration-200">Fitur</button>
              <button onClick={() => scrollToSection("dashboard")} className="text-left px-4 py-3 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-green-700 font-semibold rounded-lg transition-colors duration-200">Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}