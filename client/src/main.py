
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SoilInput(BaseModel):
    ph: float
    moisture: float
    nitrogen: float
    soil_type: str

@app.post("/predict")
def predict(data: SoilInput):
    # ----- CONDITION LOGIC -----
    if data.ph < 5.5:
        condition = "Acidic Soil"
    elif data.ph > 7.5:
        condition = "Alkaline Soil"
    else:
        condition = "Healthy Soil"

    # ----- WATER REQUIREMENT -----
    if data.moisture < 20:
        water = 35
    elif data.moisture < 40:
        water = 25
    else:
        water = 15

    # ----- CROP RECOMMENDATION -----
    crops = []

    if data.soil_type == "black":
        crops = ["Cotton", "Pulses", "Soybean"]
    elif data.soil_type == "red":
        crops = ["Groundnut", "Millets", "Pigeon Pea"]
    elif data.soil_type == "alluvial":
        crops = ["Rice", "Wheat", "Sugarcane"]

    return {
        "condition": condition,
        "water_need": water,
        "crops": crops
    }
