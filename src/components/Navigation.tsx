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
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 border-b border-gradient-to-r from-green-200 via-yellow-200 to-green-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 transition-all duration-500 shadow-lg">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 via-yellow-50/50 to-green-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced design */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-green-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                <Leaf className="text-white text-xl group-hover:animate-pulse" />
              </div>
              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black gradient-text group-hover:scale-105 transition-transform duration-300">AgriForesight</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">AI PREDICTION</span>
            </div>
          </div>
          
          {/* Desktop Navigation Links with glass morphism */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection("home")}
              className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/30 backdrop-blur-sm group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-yellow-500/0 group-hover:from-green-500/10 group-hover:to-yellow-500/10 rounded-xl transition-all duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("dashboard")}
              className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/30 backdrop-blur-sm group"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-yellow-500/0 group-hover:from-green-500/10 group-hover:to-yellow-500/10 rounded-xl transition-all duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/30 backdrop-blur-sm group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-yellow-500/0 group-hover:from-green-500/10 group-hover:to-yellow-500/10 rounded-xl transition-all duration-300"></div>
            </button>
          </div>
          
          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {theme === "light" ? (
                <Sun className="relative z-10 h-6 w-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="relative z-10 h-6 w-6 text-blue-400 group-hover:-rotate-12 transition-transform duration-500" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative md:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {isMobileMenuOpen ? (
                <X className="relative z-10 h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="relative z-10 h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gradient-to-r from-green-200 via-yellow-200 to-green-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl animate-slide-up">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="relative text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:to-gray-700 group"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                  Home
                </div>
              </button>
              <button
                onClick={() => scrollToSection("dashboard")}
                className="relative text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:to-gray-700 group"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                  Dashboard
                </div>
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="relative text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:to-gray-700 group"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                  About
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
