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
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900 transition-colors duration-300", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: stats.map((stat, index) => (_jsx("div", { className: "text-center group", children: _jsxs("div", { className: "bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300", children: [_jsx("div", { className: "text-4xl md:text-5xl font-bold text-green-600 mb-2", children: stat.value }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium", children: stat.label })] }) }, index))) }) }) }));
}
