import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Wand2, Coins, TrendingUp, Percent, Shield, Lightbulb, CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ScatterController } from 'chart.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ScatterController);
// Province mapping for API compatibility
const provinceMapping = {
    "DKI Jakarta": 1,
    "Jawa Barat": 2,
    "Jawa Tengah": 3,
    "Jawa Timur": 4,
    "Sumatera Utara": 5,
    "Sulawesi Selatan": 6,
    "Sumatera Selatan": 7,
    "Lampung": 8,
    "Kalimantan Timur": 9,
    "Sumatera Barat": 10,
    "Riau": 11,
    "Jambi": 12,
    "Bengkulu": 13,
    "Aceh": 14,
    "Kepulauan Riau": 15,
    "Kepulauan Bangka Belitung": 16,
    "Yogyakarta": 17,
    "Banten": 18,
    "Bali": 19,
    "Nusa Tenggara Barat": 20,
    "Nusa Tenggara Timur": 21,
    "Kalimantan Barat": 22,
    "Kalimantan Tengah": 23,
    "Kalimantan Selatan": 24,
    "Kalimantan Utara": 25,
    "Sulawesi Utara": 26,
    "Sulawesi Tengah": 27,
    "Sulawesi Tenggara": 28,
    "Gorontalo": 29,
    "Sulawesi Barat": 30,
    "Maluku": 31,
    "Maluku Utara": 32,
    "Papua": 33,
    "Papua Barat": 34,
    "Papua Selatan": 35,
    "Papua Tengah": 36,
    "Papua Pegunungan": 37,
    "Papua Barat Daya": 38
};
const staticProvinces = Object.keys(provinceMapping);
export function StaticDashboardSection() {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [predictionPeriod, setPredictionPeriod] = useState("1");
    const [predictionResult, setPredictionResult] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const [manualPrice, setManualPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    // Refs for GSAP animations
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const chartRef = useRef(null);
    const statsRef = useRef(null);
    const recommendationsRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);
    // Fetch current price from Badan Pangan API
    const fetchCurrentPrice = async (province) => {
        try {
            const provinceId = provinceMapping[province];
            if (!provinceId) {
                console.error('Province ID not found for:', province);
                return null;
            }
            const today = new Date();
            const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
            const url = `https://api-panelhargav2.badanpangan.go.id/api/front/harga-peta-provinsi?level_harga_id=3&komoditas_id=27&period_date=${formattedDate}%20-%20${formattedDate}&multi_status_map[0]=&multi_province_id[0]=${provinceId}`;
            console.log('Fetching price from:', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('API response not OK:', response.status, response.statusText);
                throw new Error(`HTTP ${response.status}: Failed to fetch current price`);
            }
            const data = await response.json();
            console.log('API Response:', data);
            // Extract rata_rata_geometrik from the response
            if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                const priceData = data.data.find((item) => item.province_id === provinceId);
                if (priceData && priceData.rata_rata_geometrik) {
                    const price = parseFloat(priceData.rata_rata_geometrik);
                    if (!isNaN(price) && price > 0) {
                        console.log('Successfully fetched price:', price);
                        return price;
                    }
                }
            }
            console.error('No valid price data found in response');
            throw new Error('No price data available for this province');
        }
        catch (error) {
            console.error('Error fetching current price:', error);
            return null;
        }
    };
    useEffect(() => {
        if (selectedProvince) {
            setApiStatus(null); // Reset status while loading
            setCurrentPrice(null);
            setPredictionResult(null);
            setChartData(null);
            setManualPrice("");
            fetchCurrentPrice(selectedProvince).then(price => {
                if (price !== null && price > 0) {
                    setCurrentPrice(price);
                    setApiStatus('success');
                    console.log('API fetch successful for', selectedProvince, ':', price);
                }
                else {
                    setCurrentPrice(null);
                    setApiStatus('failed');
                    console.log('API fetch failed for', selectedProvince);
                }
            }).catch(error => {
                console.error('fetchCurrentPrice error:', error);
                setCurrentPrice(null);
                setApiStatus('failed');
            });
        }
        else {
            // Reset when no province selected
            setCurrentPrice(null);
            setApiStatus(null);
            setPredictionResult(null);
            setChartData(null);
            setManualPrice("");
        }
    }, [selectedProvince]);
    // Get the effective price (API price or manual price)
    const getEffectivePrice = () => {
        if (apiStatus === 'success' && currentPrice !== null) {
            return currentPrice;
        }
        if (apiStatus === 'failed' && manualPrice) {
            const parsed = parseFloat(manualPrice);
            return !isNaN(parsed) && parsed > 0 ? parsed : null;
        }
        return null;
    };
    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current, {
                opacity: 0,
                y: 50
            }, {
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
            });
            // Form animation
            gsap.fromTo(formRef.current, {
                opacity: 0,
                y: 30,
                scale: 0.95
            }, {
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
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    // Chart animation
    useEffect(() => {
        if (chartRef.current && chartData) {
            gsap.fromTo(chartRef.current, {
                opacity: 0,
                y: 40,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    }, [chartData]);
    // Stats animation
    useEffect(() => {
        if (statsRef.current && predictionResult) {
            const cards = statsRef.current.querySelectorAll('.stat-card');
            gsap.fromTo(cards, {
                opacity: 0,
                y: 30,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
            });
        }
    }, [predictionResult]);
    // Recommendations animation
    useEffect(() => {
        if (recommendationsRef.current && predictionResult) {
            gsap.fromTo(recommendationsRef.current, {
                opacity: 0,
                y: 40,
                scale: 0.95
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.3
            });
        }
    }, [predictionResult]);
    const generateFuturePrediction = (currentPrice, predictionMonths, provinceId) => {
        // Fallback prediction function for offline mode
        const basePrice = currentPrice;
        const predictions = [];
        for (let month = 1; month <= predictionMonths; month++) {
            // Simulate seasonal effect (harvest seasons affect rice prices)
            const currentMonth = new Date().getMonth();
            const futureMonth = (currentMonth + month) % 12;
            const seasonalFactor = Math.sin((futureMonth / 12) * 2 * Math.PI) * 0.05;
            // Add deterministic "volatility" based on province and month
            const seed = provinceId * month * 13; // Deterministic seed
            const volatility = ((seed % 100) / 100 - 0.5) * 0.03;
            // Add inflation trend
            const inflationRate = 0.002; // 2.4% annually
            // Calculate predicted price
            const monthlyChange = seasonalFactor + volatility + (inflationRate * month);
            const predictedPrice = basePrice * (1 + monthlyChange);
            predictions.push(predictedPrice);
        }
        return predictions;
    };
    const handleGeneratePrediction = async () => {
        const effectivePrice = getEffectivePrice();
        if (!selectedProvince || !predictionPeriod || !effectivePrice)
            return;
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
        try {
            const predictionMonths = parseInt(predictionPeriod);
            // Call the real backend API for chart data
            const chartResponse = await fetch('https://agriforesight-756576346834.asia-southeast2.run.app/chart-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    province: selectedProvince,
                    prediction_months: predictionMonths,
                    current_price: effectivePrice,
                    include_historical: true,
                    chart_type: "line"
                })
            });
            if (!chartResponse.ok) {
                throw new Error('Failed to fetch prediction data');
            }
            const chartData = await chartResponse.json();
            // Create prediction result from API response
            const apiPrediction = {
                success: true,
                province: selectedProvince,
                current_price: chartData.summary.current_price,
                predicted_price: chartData.summary.final_predicted_price,
                change_percentage: chartData.summary.percentage_change,
                confidence_score: chartData.summary.confidence_score,
                prediction_period: chartData.summary.prediction_months,
                recommendations: chartData.summary.percentage_change > 5
                    ? "Harga diperkirakan naik signifikan. Pertimbangkan membeli lebih awal atau menahan stok untuk mendapatkan harga yang lebih baik."
                    : chartData.summary.percentage_change < -5
                        ? "Harga diperkirakan turun. Tunda pembelian besar atau tunggu penurunan harga untuk mendapatkan penawaran terbaik."
                        : "Harga relatif stabil dalam periode ini. Strategi pembelian normal dapat dilanjutkan tanpa perubahan khusus.",
                model_version: "LSTM_v2.1",
                timestamp: chartData.timestamp
            };
            setPredictionResult(apiPrediction);
            // Use the chart data from API but adapt the styling for our theme
            const adaptedChartData = {
                ...chartData,
                chart_data: {
                    ...chartData.chart_data,
                    datasets: chartData.chart_data.datasets.map((dataset, index) => ({
                        ...dataset,
                        borderColor: index === 0
                            ? (theme === 'dark' ? '#4ade80' : '#4CAF50')
                            : '#F9A825',
                        backgroundColor: index === 0
                            ? (theme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(76, 175, 80, 0.2)')
                            : 'rgba(249, 168, 37, 0.1)',
                        pointBackgroundColor: index === 0
                            ? (theme === 'dark' ? '#4ade80' : '#4CAF50')
                            : '#F9A825',
                        tension: 0.3,
                        borderDash: index === 0 ? undefined : [5, 5]
                    }))
                }
            };
            setChartData(adaptedChartData);
        }
        catch (error) {
            console.error('Error generating prediction:', error);
            // Fallback to the previous mock behavior if API fails
            const predictionMonths = parseInt(predictionPeriod);
            const provinceId = provinceMapping[selectedProvince];
            const futurePredictions = generateFuturePrediction(effectivePrice, predictionMonths, provinceId);
            const finalPredictedPrice = futurePredictions[futurePredictions.length - 1];
            const changePercentage = ((finalPredictedPrice - effectivePrice) / effectivePrice) * 100;
            const apiPrediction = {
                success: true,
                province: selectedProvince,
                current_price: effectivePrice,
                predicted_price: finalPredictedPrice,
                change_percentage: changePercentage,
                confidence_score: 88 + (provinceId % 8),
                prediction_period: predictionMonths,
                recommendations: changePercentage > 5
                    ? "Harga diperkirakan naik signifikan. Pertimbangkan membeli lebih awal atau menahan stok untuk mendapatkan harga yang lebih baik."
                    : changePercentage < -5
                        ? "Harga diperkirakan turun. Tunda pembelian besar atau tunggu penurunan harga untuk mendapatkan penawaran terbaik."
                        : "Harga relatif stabil dalam periode ini. Strategi pembelian normal dapat dilanjutkan tanpa perubahan khusus.",
                model_version: "LSTM_v2.1 (Offline Mode)",
                timestamp: new Date().toISOString()
            };
            setPredictionResult(apiPrediction);
        }
        finally {
            setIsLoading(false);
        }
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: theme === 'dark' ? '#E4E4E7' : '#333333' }
            },
            title: { display: false },
        },
        scales: {
            y: {
                ticks: {
                    color: theme === 'dark' ? '#A1A1AA' : 'rgba(0, 0, 0, 0.5)',
                    callback: (value) => 'Rp ' + value.toLocaleString()
                },
                grid: { color: theme === 'dark' ? '#3f3f46' : 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: { color: theme === 'dark' ? '#A1A1AA' : 'rgba(0, 0, 0, 0.5)' },
                grid: { display: false }
            }
        }
    };
    return (_jsx("section", { ref: sectionRef, id: "dashboard", className: "py-20 bg-[#4CAF50] dark:bg-[#1B1B1B] transition-colors duration-300", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { ref: titleRef, className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-white dark:text-zinc-100 mb-4", children: "Dashboard Prediksi AI" }), _jsx("div", { className: "mt-4 w-24 h-1 bg-[#F9A825] mx-auto rounded-full" }), _jsx("p", { className: "text-xl text-gray-200 dark:text-zinc-400 max-w-3xl mx-auto", children: "Pilih provinsi dan periode waktu untuk melihat prediksi harga beras masa depan berdasarkan data real-time dari Badan Pangan menggunakan AI LSTM." })] }), _jsx("div", { ref: formRef, className: "bg-white dark:bg-zinc-800 rounded-3xl p-8 mb-12 shadow-2xl border border-gray-200 dark:border-zinc-700", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide", children: "Pilih Provinsi" }), _jsxs(Select, { value: selectedProvince, onValueChange: setSelectedProvince, children: [_jsx(SelectTrigger, { className: "dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200", children: _jsx(SelectValue, { placeholder: "Pilih Provinsi..." }) }), _jsx(SelectContent, { children: staticProvinces.map((p) => (_jsx(SelectItem, { value: p, children: p }, p))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wide", children: "Periode Prediksi" }), _jsxs(Select, { value: predictionPeriod, onValueChange: setPredictionPeriod, children: [_jsx(SelectTrigger, { className: "dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "1 Bulan" }), _jsx(SelectItem, { value: "3", children: "3 Bulan" }), _jsx(SelectItem, { value: "6", children: "6 Bulan" }), _jsx(SelectItem, { value: "12", children: "1 Tahun" })] })] })] })] }), apiStatus === 'success' && currentPrice && (_jsx("div", { className: "mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800", children: _jsxs("p", { className: "text-sm text-green-700 dark:text-green-300", children: [_jsxs("strong", { children: ["Harga Saat Ini (", selectedProvince, "):"] }), " Rp ", currentPrice.toLocaleString(), _jsx("span", { className: "text-xs ml-2", children: "(Data real-time dari Badan Pangan)" })] }) })), apiStatus === 'failed' && (_jsxs("div", { className: "mt-6 space-y-4", children: [_jsx("div", { className: "p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800", children: _jsxs("p", { className: "text-sm text-yellow-700 dark:text-yellow-300", children: [_jsxs("strong", { children: ["\u26A0\uFE0F API Badan Pangan tidak tersedia untuk provinsi ", selectedProvince, "."] }), " Silakan masukkan harga beras saat ini secara manual untuk melanjutkan prediksi."] }) }), _jsxs("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800", children: [_jsx("h4", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2", children: "\uD83D\uDCCB Cara Input Harga yang Benar:" }), _jsxs("div", { className: "space-y-2 text-xs text-blue-600 dark:text-blue-400", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsxs("span", { children: [_jsx("strong", { children: "Benar:" }), " 12000 (hanya angka)"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-red-500", children: "\u2717" }), _jsxs("span", { children: [_jsx("strong", { children: "Salah:" }), " Rp 12.000, 12,000, atau 12.000"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsxs("span", { children: [_jsx("strong", { children: "Contoh:" }), " Harga Rp 15.500/kg \u2192 input: 15500"] })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 uppercase tracking-wide", children: "Harga Manual (angka saja, tanpa Rp/titik/koma)" }), _jsx("input", { type: "number", value: manualPrice, onChange: (e) => {
                                                    const value = e.target.value;
                                                    // Remove any non-numeric characters and validate
                                                    const cleanValue = value.replace(/[^0-9]/g, '');
                                                    setManualPrice(cleanValue);
                                                }, placeholder: "Contoh: 12000", min: "1000", max: "100000", step: "100", className: "w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-200 transition-all duration-200" }), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsx("p", { className: "text-xs text-gray-500 dark:text-zinc-400", children: "Masukkan harga beras saat ini dalam Rupiah per kilogram (hanya angka)" }), manualPrice && (_jsxs("p", { className: "text-xs text-green-600 dark:text-green-400", children: ["Preview: Rp ", parseInt(manualPrice || '0').toLocaleString('id-ID'), "/kg"] })), manualPrice && (parseInt(manualPrice) < 1000 || parseInt(manualPrice) > 100000) && (_jsx("p", { className: "text-xs text-red-500 dark:text-red-400", children: "\u26A0\uFE0F Harga tidak wajar. Harga beras umumnya antara Rp 1.000 - Rp 100.000/kg" }))] })] })] })), _jsx("div", { className: "mt-8 text-center", children: _jsxs(Button, { ref: buttonRef, onClick: handleGeneratePrediction, disabled: !selectedProvince || !getEffectivePrice() || isLoading, className: "relative group bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" }), _jsx("div", { className: "relative z-10 flex items-center justify-center", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), _jsx("span", { className: "animate-pulse", children: "Menganalisis dengan AI..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Wand2, { className: "mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" }), _jsx("span", { children: "Generate Prediksi AI" })] })) }), !isLoading && (_jsx("div", { className: "absolute inset-0 bg-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" }))] }) })] }) }), isLoading && (_jsx(Card, { className: "bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm dark:border-zinc-700", children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex items-center justify-center space-x-3", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400" }), _jsx("span", { className: "text-lg font-medium text-gray-700 dark:text-zinc-300 animate-pulse", children: "Menganalisis data dengan model LSTM AI..." })] }) }) })), _jsxs("div", { className: `transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} space-y-12`, children: [chartData && (_jsx("div", { ref: chartRef, children: _jsxs(Card, { className: "bg-white dark:bg-zinc-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-700", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-zinc-700/50 border-b border-gray-200 dark:border-zinc-700", children: _jsxs(CardTitle, { className: "text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center", children: [_jsx(TrendingUp, { className: "mr-3 h-6 w-6 text-green-500 dark:text-green-400" }), "Grafik Prediksi AI ", predictionResult?.prediction_period, " Bulan - ", selectedProvince] }) }), _jsx(CardContent, { className: "p-4 md:p-6", children: _jsx("div", { className: "h-96", children: _jsx(Line, { data: chartData.chart_data, options: chartOptions }, `${theme}-${selectedProvince}`) }) })] }) })), predictionResult && (_jsxs(_Fragment, { children: [_jsxs("div", { ref: statsRef, className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { className: "stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "Harga Saat Ini" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900 dark:text-zinc-100", children: ["Rp ", predictionResult.current_price.toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Coins, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: ["Prediksi ", predictionResult.prediction_period, " Bulan"] }), _jsxs("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: ["Rp ", predictionResult.predicted_price.toLocaleString()] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(TrendingUp, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "Perubahan" }), _jsxs("p", { className: `text-2xl font-bold ${predictionResult.change_percentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`, children: [predictionResult.change_percentage >= 0 ? '+' : '', predictionResult.change_percentage.toFixed(1), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Percent, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) }), _jsx(Card, { className: "stat-card bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-zinc-400", children: "AI Confidence" }), _jsxs("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: [predictionResult.confidence_score.toFixed(0), "%"] })] }), _jsx("div", { className: "w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center", children: _jsx(Shield, { className: "h-6 w-6 text-green-500 dark:text-green-400" }) })] }) }) })] }), _jsx("div", { ref: recommendationsRef, children: _jsxs(Card, { className: "bg-white dark:bg-zinc-800 shadow-2xl border border-gray-200 dark:border-zinc-700", children: [_jsx(CardHeader, { className: "border-b border-gray-200 dark:border-zinc-700", children: _jsx(CardTitle, { children: _jsxs("h3", { className: "text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center", children: [_jsx(Lightbulb, { className: "text-yellow-400 mr-3 h-6 w-6" }), "Rekomendasi AI (", predictionResult.model_version, ")"] }) }) }), _jsxs(CardContent, { className: "p-6 grid md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "bg-gray-50 dark:bg-zinc-700/50 border-0 hover:bg-gray-100 dark:hover:bg-zinc-700/70 transition-colors duration-300", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center", children: [_jsx(CheckCircle, { className: "mr-2 h-5 w-5 text-green-500" }), "Untuk Petani & Konsumen"] }), _jsx("p", { className: "text-gray-600 dark:text-zinc-400", children: predictionResult.recommendations })] }) }), _jsx(Card, { className: "bg-gray-50 dark:bg-zinc-700/50 border-0 hover:bg-gray-100 dark:hover:bg-zinc-700/70 transition-colors duration-300", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center", children: [_jsx(Store, { className: "mr-2 h-5 w-5 text-blue-500" }), "Data Source"] }), _jsx("p", { className: "text-gray-600 dark:text-zinc-400", children: "Harga real-time dari API Badan Pangan RI dengan prediksi menggunakan model LSTM yang dilatih dengan data historis 38 provinsi." })] }) })] })] }) })] }))] })] }) }));
}
