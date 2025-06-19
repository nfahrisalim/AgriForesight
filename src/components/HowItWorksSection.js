import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = [
    {
        number: 1,
        title: "Pilih Provinsi",
        description: "Pilih provinsi untuk melihat prediksi harga beras di wilayah tersebut berdasarkan data historis dan faktor-faktor yang mempengaruhi."
    },
    {
        number: 2,
        title: "Analisis Data",
        description: "Sistem menganalisis data historis, tren musiman, dan faktor ekonomi menggunakan algoritma machine learning."
    },
    {
        number: 3,
        title: "Dapatkan Prediksi",
        description: "Lihat hasil prediksi dalam bentuk grafik interaktif dengan rekomendasi waktu terbaik untuk pengambilan keputusan."
    }
];
export function HowItWorksSection() {
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4", children: "Bagaimana Cara Kerjanya?" }), _jsx("p", { className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto", children: "Proses sederhana untuk mendapatkan prediksi harga beras yang akurat" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [_jsx("div", { className: "space-y-8", children: steps.map((step, index) => (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold", children: step.number }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-2", children: step.title }), _jsx("p", { className: "text-gray-600 dark:text-gray-300", children: step.description })] })] }, index))) }), _jsx("div", { className: "relative", children: _jsxs("div", { className: "relative bg-gradient-to-br from-green-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 shadow-2xl", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600", alt: "Smart farming technology in rice fields", className: "rounded-2xl shadow-lg w-full h-auto" }), _jsx("div", { className: "absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg", children: _jsx("i", { className: "fas fa-robot text-white text-xl", children: "\uD83E\uDD16" }) }), _jsx("div", { className: "absolute -bottom-4 -left-4 w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg", children: _jsx("i", { className: "fas fa-chart-line text-white text-xl", children: "\uD83D\uDCCA" }) })] }) })] })] }) }));
}
