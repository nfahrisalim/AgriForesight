export interface Province {
  id: string;
  name: string;
}

export interface PriceData {
  date: string;
  price: number;
}

export interface PredictionResult {
  id: number;
  province: string;
  currentPrice: string;
  predictedPrice: string;
  changePercentage: string;
  confidence: string;
  predictionPeriod: number;
  recommendations: string;
  createdAt: string;
}

export interface ChartDataPoint {
  date: string;
  historical?: number;
  predicted?: number;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}
