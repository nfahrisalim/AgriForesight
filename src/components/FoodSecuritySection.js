import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, TrendingUp, Users, Shield, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
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
    };
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
                    label: function (context) {
                        return `Rp ${context.parsed.y.toLocaleString('id-ID')}/kg`;
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
                    callback: function (value) {
                        return `Rp ${value.toLocaleString('id-ID')}`;
                    }
                }
            }
        }
    };
    const benefits = [
        {
            icon: _jsx(Users, { className: "w-5 h-5" }),
            text: "Petani dapat menentukan waktu terbaik untuk menjual hasil panen"
        },
        {
            icon: _jsx(TrendingUp, { className: "w-5 h-5" }),
            text: "Distributor dapat mengoptimalkan manajemen stok dan rantai pasok"
        },
        {
            icon: _jsx(Shield, { className: "w-5 h-5" }),
            text: "Pemerintah dapat mengantisipasi fluktuasi harga untuk kebijakan stabilisasi"
        },
        {
            icon: _jsx(Target, { className: "w-5 h-5" }),
            text: "Konsumen dapat merencanakan anggaran belanja dengan lebih baik"
        }
    ];
    return (_jsx("section", { className: "py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent", children: "Mendukung Ketahanan Pangan Nasional" }), _jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed", children: "Prediksi harga yang akurat membantu semua pihak dalam rantai pasok beras, dari petani hingga konsumen, untuk mengambil keputusan yang tepat dan mendukung ketahanan pangan nasional." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-2xl font-semibold text-green-700 dark:text-green-400 mb-6 flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center", children: _jsx(Check, { className: "w-4 h-4 text-green-600 dark:text-green-400" }) }), "Manfaat Prediksi Harga Beras"] }), _jsx("div", { className: "space-y-4", children: benefits.map((benefit, index) => (_jsxs("div", { className: "flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-green-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105", children: [_jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400", children: benefit.icon }), _jsx("p", { className: "text-gray-700 dark:text-gray-300 leading-relaxed pt-2", children: benefit.text })] }, index))) })] }), _jsx("div", { className: "lg:pl-8", children: _jsxs(Card, { className: "border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-center text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }), "Tren Harga Beras Nasional"] }) }), _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "h-64 w-full", children: _jsx(Line, { data: nationalTrendData, options: chartOptions }) }), _jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" }), _jsx("span", { children: "Harga rata-rata per kilogram" })] })] })] }) })] }), _jsx("div", { className: "mt-16 text-center", children: _jsxs("div", { className: "inline-flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900 rounded-full text-green-700 dark:text-green-300 font-medium", children: [_jsx(Shield, { className: "w-4 h-4" }), _jsx("span", { children: "Bersama membangun ketahanan pangan Indonesia" })] }) })] }) }));
}
