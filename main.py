# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:40:41 2020

@author: win10
"""

# 1. Library imports
import uvicorn
from fastapi import FastAPI
from BankNotes import BankNote
import numpy as np
import pickle
import pandas as pd
from predict_model import InputData, preprocess_new_data
from pydantic import BaseModel
import joblib
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# 2. Create the app object
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
try:
    model = joblib.load("footfall_prediction_model.pkl")
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class FootfallInput(BaseModel):
    date: str
    holiday: int
    weekday: str
    facility: str  # Add facility field

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Welcome to Bhavishyavani - Footfall Prediction API'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Welcome To Bhavishyawani': f'{name}'}

# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence


# Create a FastAPI instance

# Define a POST endpoint
@app.post("/process-data")
async def process_data(data: InputData):
    # Return the received data as JSON
    return {"param1": data.param1, "param2": data.param2}

@app.post('/predict')
def predict_footfall(data: FootfallInput):
    try:
        if model is None:
            return {
                'error': 'Model not loaded',
                'message': 'The prediction model is not available'
            }
            
        # Convert input data to format expected by model
        input_data = {
            'Date': data.date,
            'Holiday': data.holiday,
            'Weekday': data.weekday,
            'Facility': data.facility  # Include facility in input data
        }
        
        print("Input data:", input_data)  # Debug print
        
        # Preprocess the data using the updated preprocessing function
        input_df = preprocess_new_data(input_data)
        
        # Make prediction
        prediction = model.predict(input_df)[0]
        
        return {
            'predicted_footfall': float(prediction),
            'timestamp': datetime.now().isoformat()
        }
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        print(f"Full error details: {e.__class__.__name__}")  # Print error class
        return {
            'error': str(e),
            'message': 'Prediction failed'
        }

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
    
#uvicorn app:app --reload