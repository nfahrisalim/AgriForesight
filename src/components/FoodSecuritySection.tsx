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
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          color: 'rgb(107, 114, 128)'
        }
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          callback: function(value: any) {
            return `Rp ${value.toLocaleString('id-ID')}`
          }
        }
      }
    }
  }

  const benefits = [
    {
      icon: <Users className="w-5 h-5" />,
      text: "Petani dapat menentukan waktu terbaik untuk menjual hasil panen"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Distributor dapat mengoptimalkan manajemen stok dan rantai pasok"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Pemerintah dapat mengantisipasi fluktuasi harga untuk kebijakan stabilisasi"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Konsumen dapat merencanakan anggaran belanja dengan lebih baik"
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mendukung Ketahanan Pangan Nasional
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Prediksi harga yang akurat membantu semua pihak dalam rantai pasok beras, dari petani hingga konsumen, 
            untuk mengambil keputusan yang tepat dan mendukung ketahanan pangan nasional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Manfaat Prediksi Harga Beras
            </h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rice Price Trend Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 transition-colors duration-300">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Tren Harga Beras Nasional
            </h4>
            <div className="h-64 w-full">
              <Line data={nationalTrendData} options={chartOptions} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Harga rata-rata per kilogram</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Shield className="w-4 h-4" />
            <span>Bersama membangun ketahanan pangan Indonesia</span>
          </div>
        </div>
      </div>
    </section>
  )
}