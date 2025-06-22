import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const stats = [
    {
        value: "62%",
        label: "Penduduk mengonsumsi beras sebagai makanan pokok"
    },
    {
        value: "34",
        label: "Provinsi dengan data harga beras terkini"
    },
    {
        value: "95%",
        label: "Tingkat akurasi prediksi harga"
    }
];
export function StatsSection() {
    return (_jsx("section", { className: "py-20 bg-white dark:bg-[#2E7D32] transition-colors duration-300", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: stats.map((stat, index) => (_jsx("div", { className: "text-center group flex", children: _jsxs("div", { className: "bg-[#F6FBF6] dark:bg-green-900/50 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300 shadow-md w-full h-full flex flex-col justify-center", children: [_jsx("div", { className: "text-4xl md:text-5xl font-bold text-[#4CAF50] dark:text-yellow-400 mb-2 transition-colors duration-300", children: stat.value }), _jsx("p", { className: "text-gray-600 dark:text-white font-medium transition-colors duration-300", children: stat.label })] }) }, index))) }) }) }));
}
