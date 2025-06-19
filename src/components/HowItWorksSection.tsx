import { StepItem } from "@/lib/types";

const steps: StepItem[] = [
  {
    number: 1,
    title: "Pilih Provinsi",
    description: "Pilih provinsi untuk melihat prediksi harga beras di wilayah tersebut berdasarkan data historis dan faktor-faktor yang mempengaruhi."
  },
  {
    number: 2,
    title: "Analisis Data",
    description: "Sistem menganalisis data historis, tren musiman, dan faktor ekonomi menggunakan algoritma machine learning."
  },
  {
    number: 3,
    title: "Dapatkan Prediksi",
    description: "Lihat hasil prediksi dalam bentuk grafik interaktif dengan rekomendasi waktu terbaik untuk pengambilan keputusan."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proses sederhana untuk mendapatkan prediksi harga beras yang akurat
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Smart farming technology in rice fields" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-robot text-white text-xl">🤖</i>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-chart-line text-white text-xl">📊</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
