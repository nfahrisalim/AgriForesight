
import { useState, useEffect, useRef } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions,
} from 'chart.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const data = generateHistoricalData(selectedProvince);
      setHistoricalPrices(data);
      setPredictionResult(null);
    }
  }, [selectedProvince]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Chart animation
  useEffect(() => {
    if (chartRef.current && selectedProvince && historicalPrices.length > 0) {
      gsap.fromTo(chartRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [selectedProvince, historicalPrices]);

  // Stats animation
  useEffect(() => {
    if (statsRef.current && predictionResult) {
      const cards = statsRef.current.querySelectorAll('.stat-card');
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    }
  }, [predictionResult]);

  // Recommendations animation
  useEffect(() => {
    if (recommendationsRef.current && predictionResult) {
      gsap.fromTo(recommendationsRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, [predictionResult]);

  const handleGeneratePrediction = async () => {
    if (!selectedProvince || !predictionPeriod) return;
    
    // Button click animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const prediction = generatePrediction(selectedProvince, parseInt(predictionPeriod));
    setPredictionResult(prediction);
    setIsLoading(false);
  };
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: theme === 'dark' ? '#E4E4E7' : '#333333' } },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: { color: theme === 'dark' ? '#A1A1AA' : 'rgba(0, 0, 0, 0.5)', callback: (value) => 'Rp ' + (value as number).toLocaleString() },
        grid: { color: theme === 'dark' ? '#3f3f46' : 'rgba(0, 0, 0, 0.1)' }
      },
      x: {
        ticks: { color: theme === 'dark' ? '#A1A1AA' : 'rgba(0, 0, 0, 0.5)' },
        grid: { display: false }
      }
    }
  };
  
  const chartData = {
    labels: historicalPrices.map((p) => new Date(p.date).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })),
    datasets: [
      { label: 'Harga Historis', data: historicalPrices.map((p) => parseFloat(p.price)), borderColor: theme === 'dark' ? '#4ade80' : '#4CAF50', backgroundColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(76, 175, 80, 0.2)', tension: 0.3, pointBackgroundColor: theme === 'dark' ? '#4ade80' : '#4CAF50' },
      ...(predictionResult ? [{ label: 'Harga Prediksi', data: [...new Array(historicalPrices.length - 1).fill(null), parseFloat(predictionResult.currentPrice), parseFloat(predictionResult.predictedPrice)], borderColor: '#F9A825', backgroundColor: 'rgba(249, 168, 37, 0.1)', borderDash: [5, 5], tension: 0.3, pointBackgroundColor: '#F9A825' }] : []),
    ],
  };

  return (
    <section ref={sectionRef} id="dashboard" className="py-20 bg-[#4CAF50] dark:bg-[#1B1B1B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-zinc-100 mb-4">
            Dashboard Prediksi
          </h2>
          <div className="mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full"></div>
          <p className="text-xl text-gray-200 dark:text-zinc-400 max-w-3xl mx-auto">
            Pilih provinsi dan lihat prediksi harga beras dengan visualisasi data yang komprehensif.
          </p>
        </div>

        {/* Prediction Form */}
        <div ref={formRef} className="bg-white dark:bg-zinc-800 rounded-3xl p-8 mb-12 shadow-2xl border border-gray-200 dark:border-zinc-700">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide">Pilih Provinsi</label>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger className="dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200">
                    <SelectValue placeholder="Pilih Provinsi..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staticProvinces.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide">Periode Prediksi</label>
                <Select value={predictionPeriod} onValueChange={setPredictionPeriod}>
                  <SelectTrigger className="dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bulan</SelectItem>
                    <SelectItem value="3">3 Bulan</SelectItem>
                    <SelectItem value="6">6 Bulan</SelectItem>
                    <SelectItem value="12">1 Tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button 
                ref={buttonRef}
                onClick={handleGeneratePrediction} 
                disabled={!selectedProvince || isLoading} 
                className="relative group bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="animate-pulse">Menganalisis...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Generate Prediksi AI</span>
                    </>
                  )}
                </div>
                {!isLoading && (
                  <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading && (
          <Card className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm dark:border-zinc-700">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400"></div>
                <span className="text-lg font-medium text-gray-700 dark:text-zinc-300 animate-pulse">Menganalisis data...</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} space-y-12`}>
          {selectedProvince && historicalPrices.length > 0 && (
            <div ref={chartRef}>
              <Card className="bg-white dark:bg-zinc-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-700">
                <CardHeader className="bg-gray-50 dark:bg-zinc-700/50 border-b border-gray-200 dark:border-zinc-700">
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-green-500 dark:text-green-400" />
                    Grafik Harga - {selectedProvince}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="h-96">
                    <Line key={theme} data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {predictionResult && (
            <>
              <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Harga Saat Ini</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Rp {parseFloat(predictionResult.currentPrice).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Coins className="h-6 w-6 text-green-500 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Prediksi {predictionResult.predictionPeriod} Bulan</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">Rp {parseFloat(predictionResult.predictedPrice).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-500 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Perubahan</p>
                        <p className={`text-2xl font-bold ${parseFloat(predictionResult.changePercentage) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                          {parseFloat(predictionResult.changePercentage) >= 0 ? '+' : ''}{parseFloat(predictionResult.changePercentage).toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Percent className="h-6 w-6 text-green-500 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Confidence</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{parseFloat(predictionResult.confidence).toFixed(0)}%</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-500 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div ref={recommendationsRef}>
                <Card className="bg-white dark:bg-zinc-800 shadow-2xl border border-gray-200 dark:border-zinc-700">
                  <CardHeader className="border-b border-gray-200 dark:border-zinc-700">
                    <CardTitle>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center">
                        <Lightbulb className="text-yellow-400 mr-3 h-6 w-6" />
                        Rekomendasi Strategis
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-50 dark:bg-zinc-700/50 border-0 hover:bg-gray-100 dark:hover:bg-zinc-700/70 transition-colors duration-300">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          Untuk Petani & Konsumen
                        </h4>
                        <p className="text-gray-600 dark:text-zinc-400">{predictionResult.recommendations}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-zinc-700/50 border-0 hover:bg-gray-100 dark:hover:bg-zinc-700/70 transition-colors duration-300">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center">
                          <Store className="mr-2 h-5 w-5 text-blue-500" />
                          Untuk Distributor & Pemerintah
                        </h4>
                        <p className="text-gray-600 dark:text-zinc-400">{predictionResult.recommendations}</p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
