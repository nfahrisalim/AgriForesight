// src/components/StaticDashboardSection.tsx

import { useState, useEffect } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// --- Data & Fungsi Demo (Tidak ada perubahan) ---
const staticProvinces = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara", "Sulawesi Selatan"];
const generateHistoricalData = (province: string) => {
  const basePrice = 12000 + (staticProvinces.indexOf(province) * 200);
  const data = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const price = basePrice + (Math.sin(i * 0.5) * 500) + (Math.random() * 400 - 200);
    data.push({ date: date.toISOString(), price: price.toString() });
  }
  return data;
};
const generatePrediction = (province: string, predictionPeriod: number) => {
  const historicalData = generateHistoricalData(province);
  const currentPrice = parseFloat(historicalData[historicalData.length - 1].price);
  const trend = (Math.random() - 0.5) * 0.1;
  const seasonality = Math.sin((new Date().getMonth() / 12) * 2 * Math.PI) * 0.03;
  const predictedPrice = currentPrice * (1 + trend * predictionPeriod + seasonality);
  const changePercentage = ((predictedPrice - currentPrice) / currentPrice) * 100;
  let recommendations = "";
  if (changePercentage > 5) {
    recommendations = "Harga diperkirakan naik signifikan. Pertimbangkan membeli lebih awal atau menahan stok.";
  } else if (changePercentage < -5) {
    recommendations = "Harga diperkirakan turun signifikan. Jual sebelum penurunan atau tunggu untuk pembelian besar.";
  } else {
    recommendations = "Harga relatif stabil. Tidak ada perubahan strategi khusus yang diperlukan saat ini.";
  }
  return { id: 1, province, currentPrice: currentPrice.toString(), predictedPrice: predictedPrice.toString(), changePercentage: changePercentage.toString(), confidence: "94.5", predictionPeriod, recommendations, createdAt: new Date().toISOString() };
};
// --- Akhir Data & Fungsi Demo ---


export function StaticDashboardSection() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [predictionPeriod, setPredictionPeriod] = useState<string>("1");
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [historicalPrices, setHistoricalPrices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // State untuk melacak tema, agar chart bisa re-render saat tema berubah
  const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  useEffect(() => {
    // Observer untuk mendeteksi perubahan tema pada elemen <html>
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          setTheme(newTheme);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const data = generateHistoricalData(selectedProvince);
      setHistoricalPrices(data);
      setPredictionResult(null);
    }
  }, [selectedProvince]);

  const handleGeneratePrediction = async () => {
    if (!selectedProvince || !predictionPeriod) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const prediction = generatePrediction(selectedProvince, parseInt(predictionPeriod));
    setPredictionResult(prediction);
    setIsLoading(false);
  };
  
  // Opsi Chart dengan warna yang disesuaikan
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: theme === 'dark' ? '#FFFFFF' : '#333333' } },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)', callback: (value) => 'Rp ' + (value as number).toLocaleString() },
        grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
      },
      x: {
        ticks: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)' },
        grid: { display: false }
      }
    }
  };
  
  const chartData = {
    labels: historicalPrices.map((p) => new Date(p.date).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })),
    datasets: [
      { label: 'Harga Historis', data: historicalPrices.map((p) => parseFloat(p.price)), borderColor: theme === 'dark' ? '#9ccc65' : '#4CAF50', backgroundColor: theme === 'dark' ? 'rgba(156, 204, 101, 0.2)' : 'rgba(76, 175, 80, 0.2)', tension: 0.3, pointBackgroundColor: theme === 'dark' ? '#9ccc65' : '#4CAF50' },
      ...(predictionResult ? [{ label: 'Harga Prediksi', data: [...new Array(historicalPrices.length - 1).fill(null), parseFloat(predictionResult.currentPrice), parseFloat(predictionResult.predictedPrice)], borderColor: '#F9A825', backgroundColor: 'rgba(249, 168, 37, 0.2)', borderDash: [5, 5], tension: 0.3, pointBackgroundColor: '#F9A825' }] : []),
    ],
  };

  return (
    <section id="dashboard" className="py-20 bg-[#4CAF50] dark:bg-[#29792D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard Prediksi
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Pilih provinsi dan lihat prediksi harga beras dengan visualisasi data yang komprehensif.
          </p>
          <div className="mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full"></div>
        </div>

        {/* Prediction Form */}
        <div className="bg-white dark:bg-[#48a74c] rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-3 uppercase tracking-wide">Pilih Provinsi</label>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}><SelectTrigger><SelectValue placeholder="Pilih Provinsi..." /></SelectTrigger><SelectContent>{staticProvinces.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}</SelectContent></Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-3 uppercase tracking-wide">Periode Prediksi</label>
                <Select value={predictionPeriod} onValueChange={setPredictionPeriod}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 Bulan</SelectItem><SelectItem value="3">3 Bulan</SelectItem><SelectItem value="6">6 Bulan</SelectItem><SelectItem value="12">1 Tahun</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button onClick={handleGeneratePrediction} disabled={!selectedProvince || isLoading} className="relative group bg-[#4CAF50] dark:bg-[#29792D] text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden disabled:opacity-60 disabled:transform-none">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-white/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {/* Magic sparkles */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {isLoading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Menganalisis...</>) : (<><Wand2 className="mr-3 h-6 w-6" /> Generate Prediksi AI</>)}
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading && (
            <Card className="bg-white/80 dark:bg-[#48a74c]/80 backdrop-blur-sm"><CardContent className="p-8"><div className="flex items-center justify-center space-x-3"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4CAF50] dark:border-white"></div><span className="text-lg font-medium text-gray-700 dark:text-white">Menganalisis data...</span></div></CardContent></Card>
        )}

        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} space-y-12`}>
          {selectedProvince && historicalPrices.length > 0 && (
            <Card className="bg-white dark:bg-[#48a74c] shadow-2xl overflow-hidden">
              <CardHeader className="bg-black/5 dark:bg-black/10"><CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"><TrendingUp className="mr-3 h-6 w-6 text-[#4CAF50] dark:text-[#F9A825]" />Grafik Harga - {selectedProvince}</CardTitle></CardHeader>
              <CardContent className="p-4 md:p-6"><div className="h-96"><Line key={theme} data={chartData} options={chartOptions} /></div></CardContent>
            </Card>
          )}

          {predictionResult && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white dark:bg-[#48a74c] shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500 dark:text-gray-100">Harga Saat Ini</p><p className="text-2xl font-bold text-gray-800 dark:text-white">Rp {parseFloat(predictionResult.currentPrice).toLocaleString()}</p></div><div className="w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center"><Coins className="h-6 w-6 text-[#4CAF50] dark:text-white" /></div></div></CardContent></Card>
                <Card className="bg-white dark:bg-[#48a74c] shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500 dark:text-gray-100">Prediksi {predictionResult.predictionPeriod} Bulan</p><p className="text-2xl font-bold text-green-600 dark:text-green-300">Rp {parseFloat(predictionResult.predictedPrice).toLocaleString()}</p></div><div className="w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center"><TrendingUp className="h-6 w-6 text-[#4CAF50] dark:text-white" /></div></div></CardContent></Card>
                <Card className="bg-white dark:bg-[#48a74c] shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500 dark:text-gray-100">Perubahan</p><p className={`text-2xl font-bold ${parseFloat(predictionResult.changePercentage) >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-400'}`}>{parseFloat(predictionResult.changePercentage) >= 0 ? '+' : ''}{parseFloat(predictionResult.changePercentage).toFixed(1)}%</p></div><div className="w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center"><Percent className="h-6 w-6 text-[#4CAF50] dark:text-white" /></div></div></CardContent></Card>
                <Card className="bg-white dark:bg-[#48a74c] shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500 dark:text-gray-100">Confidence</p><p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{parseFloat(predictionResult.confidence).toFixed(0)}%</p></div><div className="w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center"><Shield className="h-6 w-6 text-[#4CAF50] dark:text-white" /></div></div></CardContent></Card>
              </div>
              
              <Card className="bg-white dark:bg-[#48a74c] shadow-2xl">
                <CardHeader><CardTitle><h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"><Lightbulb className="text-yellow-500 mr-3 h-6 w-6" />Rekomendasi Strategis</h3></CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-50 dark:bg-black/10"><CardContent className="p-6"><h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-300" />Untuk Petani & Konsumen</h4><p className="text-gray-600 dark:text-gray-200">{predictionResult.recommendations}</p></CardContent></Card>
                  <Card className="bg-gray-50 dark:bg-black/10"><CardContent className="p-6"><h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center"><Store className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-300" />Untuk Distributor & Pemerintah</h4><p className="text-gray-600 dark:text-gray-200">{predictionResult.recommendations}</p></CardContent></Card>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}