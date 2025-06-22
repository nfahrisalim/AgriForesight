import { Check, TrendingUp, Users, Shield, Target } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function FoodSecuritySection() {
  // Rice price trend data for national chart
  const nationalTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'Harga Rata-rata Nasional (Rp/kg)',
        data: [12500, 12800, 13200, 13500, 13800, 14200, 14500, 14800, 15100, 15400, 15200, 14900],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Rp ${context.parsed.y.toLocaleString('id-ID')}/kg`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12
          },
          callback: function(value: any) {
            return `Rp ${(value / 1000).toFixed(0)}k`
          }
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 8,
        hoverBorderWidth: 3
      },
      line: {
        borderWidth: 3
      }
    }
  }
  const benefits = [
    { icon: <Users className="w-6 h-6" />, text: "Petani dapat menentukan waktu terbaik untuk menjual hasil panen." },
    { icon: <TrendingUp className="w-6 h-6" />, text: "Distributor dapat mengoptimalkan manajemen stok dan rantai pasok." },
    { icon: <Shield className="w-6 h-6" />, text: "Pemerintah dapat mengantisipasi fluktuasi harga untuk kebijakan stabilisasi." },
    { icon: <Target className="w-6 h-6" />, text: "Konsumen dapat merencanakan anggaran belanja dengan lebih baik." }
  ];

  return (
    <section className="py-20 bg-[#4CAF50] dark:bg-[#1B1B1B] transition-colors duration-300 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mendukung Ketahanan Pangan Nasional
          </h2>
          <div className="mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Prediksi harga yang akurat membantu semua pihak dalam rantai pasok beras untuk mengambil keputusan yang tepat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-6">Manfaat Prediksi Harga Beras</h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-[#4CAF50] transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-gray-100 leading-relaxed pt-3">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/95 dark:bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-colors duration-300 hover:shadow-2xl">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
              Tren Harga Beras Nasional
            </h4>
            <div className="relative h-72 w-full">
              <div className="h-48 sm:h-64 md:h-72 w-full">
                <Line data={nationalTrendData} options={chartOptions} />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-600">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span>Harga rata-rata per kilogram</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Shield className="w-4 h-4" />
            <span>Bersama membangun ketahanan pangan Indonesia</span>
            </div>
          </div>
        </div>
    </section>
  );
}