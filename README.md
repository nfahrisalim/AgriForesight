# Rice Price Prediction Dashboard

Modern React TypeScript application for predicting rice prices in Indonesia with AI-powered analytics.

## Features

- **Enhanced UI**: Beautiful animated buttons with shimmer effects and glass morphism design
- **Dark/Light Mode**: Complete theme toggle with smooth transitions
- **Interactive Dashboard**: Province selection and price prediction with realistic algorithms
- **Chart Visualization**: Historical and predicted price charts using Chart.js
- **Responsive Design**: Works perfectly on all devices
- **Static Application**: No backend dependencies, runs entirely in the browser

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npx vite --host 0.0.0.0 --port 5173
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── index.html                          # Main entry point
├── src/
│   ├── components/
│   │   ├── StaticDashboardSection.tsx  # Main dashboard with prediction logic
│   │   ├── Navigation.tsx              # Enhanced navbar with animations
│   │   ├── HeroSection.tsx             # Landing section with CTA buttons
│   │   ├── ThemeProvider.tsx           # Dark/light mode management
│   │   └── ui/                         # Essential UI components
│   ├── lib/
│   │   ├── types.ts                    # TypeScript type definitions
│   │   └── utils.ts                    # Utility functions
│   ├── App.tsx                         # Main app component
│   ├── main.tsx                        # React entry point
│   └── index.css                       # Global styles with animations
└── tailwind.config.ts                  # Tailwind configuration
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **Chart.js** - Data visualization
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

## License

MIT License