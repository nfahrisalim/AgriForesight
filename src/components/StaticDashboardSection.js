import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// --- Data & Fungsi Demo (Tidak ada perubahan) ---
const staticProvinces = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara", "Sulawesi Selatan"];
const generateHistoricalData = (province) => {
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
const generatePrediction = (province, predictionPeriod) => {
    const historicalData = generateHistoricalData(province);
    const currentPrice = parseFloat(historicalData[historicalData.length - 1].price);
    const trend = (Math.random() - 0.5) * 0.1;
    const seasonality = Math.sin((new Date().getMonth() / 12) * 2 * Math.PI) * 0.03;
    const predictedPrice = currentPrice * (1 + trend * predictionPeriod + seasonality);
    const changePercentage = ((predictedPrice - currentPrice) / currentPrice) * 100;
    let recommendations = "";
    if (changePercentage > 5) {
        recommendations = "Harga diperkirakan naik signifikan. Pertimbangkan membeli lebih awal atau menahan stok.";
    }
    else if (changePercentage < -5) {
        recommendations = "Harga diperkirakan turun signifikan. Jual sebelum penurunan atau tunggu untuk pembelian besar.";
    }
    else {
        recommendations = "Harga relatif stabil. Tidak ada perubahan strategi khusus yang diperlukan saat ini.";
    }
    return { id: 1, province, currentPrice: currentPrice.toString(), predictedPrice: predictedPrice.toString(), changePercentage: changePercentage.toString(), confidence: "94.5", predictionPeriod, recommendations, createdAt: new Date().toISOString() };
};
// --- Akhir Data & Fungsi Demo ---
export function StaticDashboardSection() {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [predictionPeriod, setPredictionPeriod] = useState("1");
    const [predictionResult, setPredictionResult] = useState(null);
    const [historicalPrices, setHistoricalPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
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
    const handleGeneratePrediction = async () => {
        if (!selectedProvince || !predictionPeriod)
            return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const prediction = generatePrediction(selectedProvince, parseInt(predictionPeriod));
        setPredictionResult(prediction);
        setIsLoading(false);
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { color: theme === 'dark' ? '#E4E4E7' : '#333333' } },
            title: { display: false },
        },
        scales: {
            y: {
                ticks: { color: theme === 'dark' ? '#A1A1AA' : 'rgba(0, 0, 0, 0.5)', callback: (value) => 'Rp ' + value.toLocaleString() },
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
    return (_jsx("section", { id: "dashboard", className: "py-20 bg-[#4CAF50] dark:bg-[#1B1B1B] transition-colors duration-300", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-white dark:text-zinc-100 mb-4", children: "Dashboard Prediksi" }), _jsx("div", { className: "mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full" }), _jsx("p", { className: "text-xl text-gray-200 dark:text-zinc-400 max-w-3xl mx-auto", children: "Pilih provinsi dan lihat prediksi harga beras dengan visualisasi data yang komprehensif." })] }), _jsx("div", { className: "bg-white dark:bg-zinc-800 rounded-3xl p-8 mb-12 shadow-2xl border border-gray-200 dark:border-zinc-700", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide", children: "Pilih Provinsi" }), _jsxs(Select, { value: selectedProvince, onValueChange: setSelectedProvince, children: [_jsx(SelectTrigger, { className: "dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200", children: _jsx(SelectValue, { placeholder: "Pilih Provinsi..." }) }), _jsx(SelectContent, { children: staticProvinces.map((p) => (_jsx(SelectItem, { value: p, children: p }, p))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide", children: "Periode Prediksi" }), _jsxs(Select, { value: predictionPeriod, onValueChange: setPredictionPeriod, children: [_jsx(SelectTrigger, { className: "dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "1 Bulan" }), _jsx(SelectItem, { value: "3", children: "3 Bulan" }), _jsx(SelectItem, { value: "6", children: "6 Bulan" }), _jsx(SelectItem, { value: "12", children: "1 Tahun" })] })] })] })] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs(Button, { onClick: handleGeneratePrediction, disabled: !selectedProvince || isLoading, className: "relative group bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" }), _jsx("div", { className: "relative z-10 flex items-center justify-center", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), " Menganalisis..."] })) : (_jsxs(_Fragment, { children: [_jsx(Wand2, { className: "mr-3 h-6 w-6" }), " Generate Prediksi AI"] })) })] }) })] }) }), isLoading && (_jsx(Card, { className: "bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm dark:border-zinc-700", children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex items-center justify-center space-x-3", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400" }), _jsx("span", { className: "text-lg font-medium text-gray-700 dark:text-zinc-300", children: "Menganalisis data..." })] }) }) })), _jsxs("div", { className: `transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} space-y-12`, children: [selectedProvince && historicalPrices.length > 0 && (_jsxs(Card, { className: "bg-white dark:bg-zinc-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-700", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-zinc-700/50 border-b border-gray-200 dark:border-zinc-700", children: _jsxs(CardTitle, { className: "text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center", children: [_jsx(TrendingUp, { className: "mr-3 h-6 w-6 text-green-500 dark:text-green-400" }), "Grafik Harga - ", selectedProvince] }) }), _jsx(CardContent, { className: "p-4 md:p-6", children: _jsx("div", { className: "h-96", children: _jsx(Line, { data: chartData, options: chartOptions }, theme) }) })] })), predictionResult && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { className: "bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "Harga Saat Ini" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900 dark:text-zinc-100", children: ["Rp ", parseFloat(predictionResult.currentPrice).toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Coins, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: ["Prediksi ", predictionResult.predictionPeriod, " Bulan"] }), _jsxs("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: ["Rp ", parseFloat(predictionResult.predictedPrice).toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(TrendingUp, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "Perubahan" }), _jsxs("p", { className: `text-2xl font-bold ${parseFloat(predictionResult.changePercentage) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`, children: [parseFloat(predictionResult.changePercentage) >= 0 ? '+' : '', parseFloat(predictionResult.changePercentage).toFixed(1), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Percent, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "Confidence" }), _jsxs("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: [parseFloat(predictionResult.confidence).toFixed(0), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Shield, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) })] }), _jsxs(Card, { className: "bg-white dark:bg-zinc-800 shadow-2xl border border-gray-200 dark:border-zinc-700", children: [_jsx(CardHeader, { className: "border-b border-gray-200 dark:border-zinc-700", children: _jsx(CardTitle, { children: _jsxs("h3", { className: "text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center", children: [_jsx(Lightbulb, { className: "text-yellow-400 mr-3 h-6 w-6" }), "Rekomendasi Strategis"] }) }) }), _jsxs(CardContent, { className: "p-6 grid md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "bg-gray-50 dark:bg-zinc-700/50 border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center", children: [_jsx(CheckCircle, { className: "mr-2 h-5 w-5 text-green-500" }), "Untuk Petani & Konsumen"] }), _jsx("p", { className: "text-gray-600 dark:text-zinc-400", children: predictionResult.recommendations })] }) }), _jsx(Card, { className: "bg-gray-50 dark:bg-zinc-700/50 border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center", children: [_jsx(Store, { className: "mr-2 h-5 w-5 text-blue-500" }), "Untuk Distributor & Pemerintah"] }), _jsx("p", { className: "text-gray-600 dark:text-zinc-400", children: predictionResult.recommendations })] }) })] })] })] }))] })] }) }));
}
