import { useState } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Static data untuk demo
const staticProvinces = [
  "DKI Jakarta",
  "Jawa Barat", 
  "Jawa Tengah",
  "Jawa Timur",
  "Sumatera Utara",
  "Sulawesi Selatan"
];

// Generate static historical data
const generateHistoricalData = (province: string) => {
  const basePrice = 12000 + (staticProvinces.indexOf(province) * 200);
  const data = [];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const price = basePrice + (Math.sin(i * 0.5) * 500) + (Math.random() * 400 - 200);
    data.push({
      date: date.toISOString(),
      price: price.toString()
    });
  }
  
  return data;
};

// Generate prediction
const generatePrediction = (province: string, predictionPeriod: number) => {
  const historicalData = generateHistoricalData(province);
  const currentPrice = parseFloat(historicalData[historicalData.length - 1].price);
  
  // Simple prediction algorithm
  const trend = (Math.random() - 0.5) * 0.1; // -5% to +5% trend
  const seasonality = Math.sin((new Date().getMonth() / 12) * 2 * Math.PI) * 0.03;
  const predictedPrice = currentPrice * (1 + trend * predictionPeriod + seasonality);
  
  const changePercentage = ((predictedPrice - currentPrice) / currentPrice) * 100;
  
  let recommendations = "";
  if (changePercentage > 5) {
    recommendations = "Harga diperkirakan naik signifikan. Untuk petani: waktu baik untuk menahan stok. Untuk konsumen: pertimbangkan membeli lebih awal.";
  } else if (changePercentage < -5) {
    recommendations = "Harga diperkirakan turun signifikan. Untuk petani: jual sebelum penurunan. Untuk konsumen: tunggu untuk pembelian besar.";
  } else {
    recommendations = "Harga relatif stabil. Tidak ada perubahan strategi khusus yang diperlukan.";
  }

  return {
    id: 1,
    province,
    currentPrice: currentPrice.toString(),
    predictedPrice: predictedPrice.toString(),
    changePercentage: changePercentage.toString(),
    confidence: "94.5",
    predictionPeriod,
    recommendations,
    createdAt: new Date().toISOString()
  };
};

export function StaticDashboardSection() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [predictionPeriod, setPredictionPeriod] = useState<string>("1");
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [historicalPrices, setHistoricalPrices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update historical data when province changes
  useEffect(() => {
    if (selectedProvince) {
      const data = generateHistoricalData(selectedProvince);
      setHistoricalPrices(data);
    }
  }, [selectedProvince]);

  const handleGeneratePrediction = async () => {
    if (!selectedProvince || !predictionPeriod) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const prediction = generatePrediction(selectedProvince, parseInt(predictionPeriod));
    setPredictionResult(prediction);
    setIsLoading(false);
  };

  // Prepare chart data
  const chartData = {
    labels: historicalPrices.map((price: any) => 
      new Date(price.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
    ),
    datasets: [
      {
        label: 'Historical Price',
        data: historicalPrices.map((price: any) => parseFloat(price.price)),
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
      },
      ...(predictionResult ? [{
        label: 'Predicted Price',
        data: [
          ...new Array(historicalPrices.length - 1).fill(null),
          parseFloat(predictionResult.currentPrice),
          parseFloat(predictionResult.predictedPrice),
        ],
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      }] : []),
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Rice Price Analysis - ${selectedProvince}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return 'Rp ' + (value as number).toLocaleString();
          }
        }
      }
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard Prediksi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pilih provinsi dan lihat prediksi harga beras dengan visualisasi data yang komprehensif
          </p>
        </div>
        
        {/* Prediction Form */}
        <div className="bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 mb-12 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  Pilih Provinsi
                </label>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Provinsi..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staticProvinces.map((province: string) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  Periode Prediksi
                </label>
                <Select value={predictionPeriod} onValueChange={setPredictionPeriod}>
                  <SelectTrigger className="w-full">
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
                onClick={handleGeneratePrediction}
                disabled={!selectedProvince || isLoading}
                className="relative group bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/25 border-2 border-green-400/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Magic sparkles */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                
                <div className="relative z-10 flex items-center">
                  <Wand2 className="mr-3 h-6 w-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Menganalisis Data...
                    </>
                  ) : (
                    "Generate Prediksi AI"
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-12">
          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Menganalisis data...</span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Chart Card */}
          {selectedProvince && historicalPrices.length > 0 && (
            <Card className="shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700">
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Grafik Prediksi Harga Beras
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-96">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Statistics Grid */}
          {predictionResult && (
            <>
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Harga Saat Ini</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          Rp {parseFloat(predictionResult.currentPrice).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Coins className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Prediksi {predictionResult.predictionPeriod} Bulan
                        </p>
                        <p className="text-2xl font-bold text-green-500">
                          Rp {parseFloat(predictionResult.predictedPrice).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Perubahan</p>
                        <p className={`text-2xl font-bold ${parseFloat(predictionResult.changePercentage) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {parseFloat(predictionResult.changePercentage) >= 0 ? '+' : ''}{parseFloat(predictionResult.changePercentage).toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Percent className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Confidence</p>
                        <p className="text-2xl font-bold text-blue-500">{parseFloat(predictionResult.confidence).toFixed(0)}%</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recommendations */}
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Lightbulb className="text-yellow-500 mr-3 h-6 w-6" />
                    Rekomendasi Strategis
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Untuk Petani
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {predictionResult.recommendations.includes('naik') 
                            ? 'Waktu optimal untuk menahan stok dan menjual pada periode kenaikan harga yang diprediksi.'
                            : 'Pertimbangkan untuk menjual hasil panen sebelum periode penurunan harga.'
                          }
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                          <Store className="mr-2 h-5 w-5" />
                          Untuk Distributor
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {predictionResult.recommendations}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}