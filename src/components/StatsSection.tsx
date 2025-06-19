import { StatItem } from "@/lib/types";

const stats: StatItem[] = [
  {
    value: "62%",
    label: "Penduduk mengonsumsi beras sebagai makanan pokok"
  },
  {
    value: "34",
    label: "Provinsi dengan data harga beras terkini"
  },
  {
    value: "95%",
    label: "Tingkat akurasi prediksi harga"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
