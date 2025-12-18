export interface Buyer {
  name: string;
  price: number;
  isBestValue?: boolean;
}

export interface LocalizedText {
  en: string;
  hi: string;
  te: string;
  kn: string;
  mr: string;
}

export interface Crop {
  id: string;
  name: LocalizedText;
  yield: LocalizedText;
  duration: LocalizedText;
  marketPrice: number;
  buyers: Buyer[];
}

export interface SoilType {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  ph: string;
  moisture: LocalizedText;
  nutrients: LocalizedText;
  precautions: LocalizedText[];
  measures: LocalizedText[];
  crops: Crop[];
}

export interface PredictionResponse {
  condition: { label: string };
  water_need_l_per_week: number;
  recommendations: { crop_id: string; score: number }[];
}
