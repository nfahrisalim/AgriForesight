import { Check, TrendingUp, Users, Shield, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Mendukung Ketahanan Pangan Nasional
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prediksi harga yang akurat membantu semua pihak dalam rantai pasok beras, dari petani hingga konsumen, 
            untuk mengambil keputusan yang tepat dan mendukung ketahanan pangan nasional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              Manfaat Prediksi Harga Beras
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-green-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    {benefit.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-2">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rice Price Trend Chart */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Tren Harga Beras Nasional
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 w-full">
                  <Line data={nationalTrendData} options={chartOptions} />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Harga rata-rata per kilogram</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900 rounded-full text-green-700 dark:text-green-300 font-medium">
            <Shield className="w-4 h-4" />
            <span>Bersama membangun ketahanan pangan Indonesia</span>
          </div>
        </div>
      </div>
    </section>
  )
}