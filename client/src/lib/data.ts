import { SoilType } from "./types";
import soilImg from "@/assets/soil_black.png";

export const SOIL_DATA: SoilType[] = [
  {
    id: "black",
    name: { en: "Black Soil", hi: "काली मिट्टी", te: "నల్ల నేల", kn: "ಕಪ್ಪು ಮಣ್ಣು", mr: "काळी माती" },
    description: { en: "Rich moisture soil", hi: "नमी युक्त मिट्टी", te: "తేమ ఎక్కువ", kn: "ಆರ್ದ್ರತೆ ಹೆಚ್ಚು", mr: "आर्द्र माती" },
    image: soilImg,
    ph: "6.0 – 7.5",
    moisture: { en: "High", hi: "अधिक", te: "ఎక్కువ", kn: "ಹೆಚ್ಚು", mr: "जास्त" },
    nutrients: { en: "Calcium, Magnesium", hi: "कैल्शियम", te: "కాల్షియం", kn: "ಕ್ಯಾಲ್ಸಿಯಂ", mr: "कॅल्शियम" },
    precautions: [{ en: "Avoid water logging", hi: "जलभराव से बचें", te: "నీరు నిలవకుండా", kn: "ನೀರು ನಿಲ್ಲಿಸಬೇಡಿ", mr: "पाणी साचू देऊ नका" }],
    measures: [{ en: "Crop rotation", hi: "फसल चक्र", te: "పంట మార్పిడి", kn: "ಬೆಳೆ ಪರಿವರ್ತನೆ", mr: "पीक फेरबदल" }],
    crops: [
      {
        id: "cotton",
        name: { en: "Cotton", hi: "कपास", te: "పత్తి", kn: "ಹತ್ತಿ", mr: "कापूस" },
        yield: { en: "Moderate", hi: "मध्यम", te: "మధ్యమ", kn: "ಮಧ್ಯಮ", mr: "मध्यम" },
        duration: { en: "120–150 days", hi: "120–150 दिन", te: "120–150 రోజులు", kn: "120–150 ದಿನ", mr: "120–150 दिवस" },
        marketPrice: 4500,
        buyers: [{ name: "Local Mill", price: 4500, isBestValue: true }],
      },
    ],
  },
];
