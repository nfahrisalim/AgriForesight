// src/components/HowItWorksSection.tsx

import { StepItem } from "@/lib/types";
import { BrainCircuit, BarChart } from "lucide-react";

const steps: StepItem[] = [
  { number: 1, title: "Pilih Provinsi", description: "Pilih provinsi untuk melihat prediksi harga beras di wilayah tersebut berdasarkan data historis." },
  { number: 2, title: "Analisis Data", description: "Sistem menganalisis data menggunakan algoritma machine learning untuk menemukan pola." },
  { number: 3, title: "Dapatkan Prediksi", description: "Lihat hasil prediksi dalam bentuk grafik interaktif dengan rekomendasi strategis." }
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#1B1B1B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proses sederhana untuk mendapatkan prediksi harga beras yang akurat.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4CAF50] dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-[#4CAF50] font-bold text-xl transition-colors duration-300">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-200">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative mt-10 md:mt-0">
            <div className="relative bg-[#F6FBF6] dark:bg-[#29792D] rounded-3xl p-8 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" alt="Smart farming technology" className="rounded-2xl shadow-lg w-full h-auto" />
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-[#4CAF50] dark:bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 transition-colors duration-300">
                <BrainCircuit className="text-white dark:text-[#4CAF50] transition-colors duration-300" size={30} />
              </div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-[#4CAF50] dark:bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 transition-colors duration-300">
                <BarChart className="text-white dark:text-[#4CAF50] transition-colors duration-300" size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}