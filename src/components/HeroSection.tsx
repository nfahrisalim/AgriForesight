// src/components/HeroSection.tsx
// (Kode tidak berubah dari sebelumnya)
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
      <div className="absolute inset-0 bg-gradient-to-br from-green-800/90 to-green-900/90"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Prediksi Harga
            <span className="block text-yellow-400">Beras Indonesia</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto leading-relaxed">
            Analisis tren harga beras dan temukan waktu terbaik untuk membeli/menjual diberbagai provinsi Indonesia untuk mendukung ketahanan pangan nasional.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button onClick={scrollToDashboard} className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25">
              <TrendingUp className="mr-3 h-6 w-6" />
              Mulai Prediksi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}