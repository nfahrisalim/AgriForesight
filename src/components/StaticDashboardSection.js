import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
// Chart.js imports
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
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
const generateHistoricalData = (province) => {
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
const generatePrediction = (province, predictionPeriod) => {
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
    }
    else if (changePercentage < -5) {
        recommendations = "Harga diperkirakan turun signifikan. Untuk petani: jual sebelum penurunan. Untuk konsumen: tunggu untuk pembelian besar.";
    }
    else {
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
    const [selectedProvince, setSelectedProvince] = useState("");
    const [predictionPeriod, setPredictionPeriod] = useState("1");
    const [predictionResult, setPredictionResult] = useState(null);
    const [historicalPrices, setHistoricalPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Update historical data when province changes
    useEffect(() => {
        if (selectedProvince) {
            const data = generateHistoricalData(selectedProvince);
            setHistoricalPrices(data);
        }
    }, [selectedProvince]);
    const handleGeneratePrediction = async () => {
        if (!selectedProvince || !predictionPeriod)
            return;
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const prediction = generatePrediction(selectedProvince, parseInt(predictionPeriod));
        setPredictionResult(prediction);
        setIsLoading(false);
    };
    // Prepare chart data
    const chartData = {
        labels: historicalPrices.map((price) => new Date(price.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })),
        datasets: [
            {
                label: 'Historical Price',
                data: historicalPrices.map((price) => parseFloat(price.price)),
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
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
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
                    callback: function (value) {
                        return 'Rp ' + value.toLocaleString();
                    }
                }
            }
        }
    };
    return (_jsx("section", { id: "dashboard", className: "py-20 bg-white dark:bg-gray-900 transition-colors duration-300", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4", children: "Dashboard Prediksi" }), _jsx("p", { className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto", children: "Pilih provinsi dan lihat prediksi harga beras dengan visualisasi data yang komprehensif" })] }), _jsx("div", { className: "bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 mb-12 shadow-xl", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide", children: "Pilih Provinsi" }), _jsxs(Select, { value: selectedProvince, onValueChange: setSelectedProvince, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Pilih Provinsi..." }) }), _jsx(SelectContent, { children: staticProvinces.map((province) => (_jsx(SelectItem, { value: province, children: province }, province))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide", children: "Periode Prediksi" }), _jsxs(Select, { value: predictionPeriod, onValueChange: setPredictionPeriod, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "1 Bulan" }), _jsx(SelectItem, { value: "3", children: "3 Bulan" }), _jsx(SelectItem, { value: "6", children: "6 Bulan" }), _jsx(SelectItem, { value: "12", children: "1 Tahun" })] })] })] })] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs(Button, { onClick: handleGeneratePrediction, disabled: !selectedProvince || isLoading, className: "relative group bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/25 border-2 border-green-400/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" }), _jsx("div", { className: "absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" }), _jsx("div", { className: "absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse" }), _jsxs("div", { className: "relative z-10 flex items-center", children: [_jsx(Wand2, { className: "mr-3 h-6 w-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" }), isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Menganalisis Data..."] })) : ("Generate Prediksi AI")] })] }) })] }) }), _jsxs("div", { className: "space-y-12", children: [isLoading && (_jsx(Card, { children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex items-center justify-center space-x-3", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" }), _jsx("span", { className: "text-lg font-medium text-gray-700 dark:text-gray-300", children: "Menganalisis data..." })] }) }) })), selectedProvince && historicalPrices.length > 0 && (_jsxs(Card, { className: "shadow-xl overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-green-600 to-green-700", children: _jsxs(CardTitle, { className: "text-2xl font-bold text-white flex items-center", children: [_jsx(TrendingUp, { className: "mr-3 h-6 w-6" }), "Grafik Prediksi Harga Beras"] }) }), _jsx(CardContent, { className: "p-8", children: _jsx("div", { className: "h-96", children: _jsx(Line, { data: chartData, options: chartOptions }) }) })] })), predictionResult && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid md:grid-cols-4 gap-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Harga Saat Ini" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: ["Rp ", parseFloat(predictionResult.currentPrice).toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center", children: _jsx(Coins, { className: "h-6 w-6 text-blue-500" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: ["Prediksi ", predictionResult.predictionPeriod, " Bulan"] }), _jsxs("p", { className: "text-2xl font-bold text-green-500", children: ["Rp ", parseFloat(predictionResult.predictedPrice).toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center", children: _jsx(TrendingUp, { className: "h-6 w-6 text-green-500" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Perubahan" }), _jsxs("p", { className: `text-2xl font-bold ${parseFloat(predictionResult.changePercentage) >= 0 ? 'text-green-500' : 'text-red-500'}`, children: [parseFloat(predictionResult.changePercentage) >= 0 ? '+' : '', parseFloat(predictionResult.changePercentage).toFixed(1), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center", children: _jsx(Percent, { className: "h-6 w-6 text-green-500" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Confidence" }), _jsxs("p", { className: "text-2xl font-bold text-blue-500", children: [parseFloat(predictionResult.confidence).toFixed(0), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center", children: _jsx(Shield, { className: "h-6 w-6 text-blue-500" }) })] }) }) })] }), _jsx(Card, { className: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 shadow-lg", children: _jsxs(CardContent, { className: "p-8", children: [_jsxs("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center", children: [_jsx(Lightbulb, { className: "text-yellow-500 mr-3 h-6 w-6" }), "Rekomendasi Strategis"] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center", children: [_jsx(CheckCircle, { className: "mr-2 h-5 w-5" }), "Untuk Petani"] }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: predictionResult.recommendations.includes('naik')
                                                                        ? 'Waktu optimal untuk menahan stok dan menjual pada periode kenaikan harga yang diprediksi.'
                                                                        : 'Pertimbangkan untuk menjual hasil panen sebelum periode penurunan harga.' })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center", children: [_jsx(Store, { className: "mr-2 h-5 w-5" }), "Untuk Distributor"] }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: predictionResult.recommendations })] }) })] })] }) })] }))] })] }) }));
}
