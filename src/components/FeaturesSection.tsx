// src/components/FeaturesSection.tsx

import { TrendingUp, Clock, ShoppingBasket } from "lucide-react";
import { FeatureItem } from "@/lib/types";

const features: FeatureItem[] = [
  { icon: "chart-line", title: "Grafik Prediksi Harga", description: "Visualisasi interaktif tren harga beras dengan prediksi akurat menggunakan algoritma machine learning" },
  { icon: "clock", title: "Analisis Tren Waktu", description: "Analisis mendalam terhadap pola perubahan harga beras berdasarkan data historis dan faktor musiman" },
  { icon: "shopping-basket", title: "Rekomendasi Pembelian", description: "Saran waktu optimal untuk pembelian atau penjualan berdasarkan prediksi tren harga ke depan" }
];

export function FeaturesSection() {
  const getIcon = (iconName: string) => {
    const iconClass = "text-white dark:text-[#4CAF50] text-2xl transition-colors duration-300";
    switch (iconName) {
      case "chart-line": return <TrendingUp className={iconClass} />;
      case "clock": return <Clock className={iconClass} />;
      case "shopping-basket": return <ShoppingBasket className={iconClass} />;
      default: return <TrendingUp className={iconClass} />;
    }
  };

  return (
    <section id="features" className="py-20 bg-[#F6FBF6] dark:bg-[#48a74c] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fitur Unggulan
          </h2>
          <div className="mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Teknologi modern untuk analisis prediksi harga beras yang akurat dan mendukung pengambilan keputusan.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-[#2E7D32] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#4CAF50] dark:bg-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}