# 🌾 AgriForesight – Rice Price Prediction Dashboard

**AgriForesight** is a modern, responsive dashboard built with **React + TypeScript**, designed to forecast rice prices across Indonesia using AI-powered analytics. It offers interactive data visualization, elegant UI, and a seamless user experience — all running entirely in the browser.

---

## ✨ Features

- 🎨 **Animated UI**  
  Elegant buttons and sections with custom shimmer effects, fade-in slides, gentle bounce, and floating animations.

- 🌗 **Dark & Light Mode**  
  Seamless theme toggle with smooth color transitions using CSS variables and context provider.

- 📊 **Interactive Dashboard**  
  Predictive analysis with province selection and historical trends.

- 📈 **Rich Data Visualization**  
  Integrated charts powered by Chart.js for historical and projected rice prices.

- 📱 **Fully Responsive**  
  Optimized for desktops, tablets, and smartphones with graceful layouts.

- 🚀 **Static & Fast**  
  No backend required — just build and deploy. Works perfectly on static hosting.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- npm or yarn

### 🔧 Installation & Development

1. Install dependencies:

   ```bash
   npm install

2. Start the development server:

   ```bash
   npx vite --host 0.0.0.0 --port 5173
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173)

---

### 🏗️ Build for Production

```bash
npm run build
```

The final static site will be output to the `dist/` folder.

---

## 📁 Project Structure

```
├── index.html                      # Entry HTML
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx         # Landing section with CTA
│   │   ├── Navigation.tsx          # Responsive navbar with transitions
│   │   ├── StaticDashboardSection.tsx # Price prediction section
│   │   ├── ThemeProvider.tsx       # Dark/light mode context
│   │   └── ui/                     # Reusable UI components (buttons, cards, etc.)
│   ├── lib/
│   │   ├── types.ts                # Type definitions
│   │   └── utils.ts                # Helper functions
│   ├── App.tsx                     # Main app layout
│   ├── main.tsx                    # React DOM renderer
│   └── index.css                   # Tailwind styles + custom animations
└── tailwind.config.ts              # Tailwind config
```

---

## ⚙️ Technologies Used

* **React 18** – UI development
* **TypeScript** – Static typing
* **Vite** – Lightning-fast dev server and bundler
* **Tailwind CSS** – Utility-first styling
* **Chart.js** – Data visualization
* **Radix UI** – Accessible and composable components
* **Lucide React** – Beautiful open-source icons

---
> Made with 💡 and 🌾 for a smarter agricultural future.
---