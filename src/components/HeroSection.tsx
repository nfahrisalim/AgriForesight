import { Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDashboard = () => {
    const element = document.getElementById("dashboard");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background with rice field image */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700/90 to-green-800/90"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      
      {/* Animated grain particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/50 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300/40 rounded-full animate-bounce-gentle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-500/30 rounded-full animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Prediksi Harga
            <span className="block text-yellow-400">Beras Indonesia</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto leading-relaxed">
            Analisis tren harga beras dengan teknologi AI untuk mendukung ketahanan pangan nasional dan keputusan bisnis yang lebih baik
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={scrollToDashboard}
              className="relative group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-yellow-400/25 border-2 border-yellow-300 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Mulai Prediksi
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="relative group border-2 border-white/70 hover:border-white text-white hover:text-green-900 bg-transparent hover:bg-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-white/20 backdrop-blur-sm overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                Lihat Demo
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
