import { TrendingUp, Clock, ShoppingBasket } from "lucide-react";
import { FeatureItem } from "@/lib/types";

const features: FeatureItem[] = [
  {
    icon: "chart-line",
    title: "Grafik Prediksi Harga",
    description: "Visualisasi interaktif tren harga beras dengan prediksi akurat menggunakan algoritma machine learning"
  },
  {
    icon: "clock",
    title: "Analisis Tren Waktu",
    description: "Analisis mendalam terhadap pola perubahan harga beras berdasarkan data historis dan faktor musiman"
  },
  {
    icon: "shopping-basket",
    title: "Rekomendasi Pembelian",
    description: "Saran waktu optimal untuk pembelian atau penjualan berdasarkan prediksi tren harga ke depan"
  }
];

export function FeaturesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "chart-line":
        return <TrendingUp className="text-white text-2xl" />;
      case "clock":
        return <Clock className="text-white text-2xl" />;
      case "shopping-basket":
        return <ShoppingBasket className="text-white text-2xl" />;
      default:
        return <TrendingUp className="text-white text-2xl" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Teknologi modern untuk analisis prediksi harga beras yang akurat dan mendukung pengambilan keputusan
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
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
