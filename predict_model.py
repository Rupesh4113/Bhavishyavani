"""
Prediction model and utilities for footfall prediction.
"""

import numpy as np
import pandas as pd
from pydantic import BaseModel
import joblib

class InputData(BaseModel):
    date: str
    holiday: int
    weekday: str
    facility: str
    param1: str = None
    param2: str = None

def preprocess_new_data(new_data):
    """Preprocess new data for prediction"""
    try:
        print("Starting preprocessing with data:", new_data)
        
        # Convert to DataFrame if not already
        if not isinstance(new_data, pd.DataFrame):
            if isinstance(new_data, dict):
                new_data = pd.DataFrame([new_data])
            else:
                new_data = pd.DataFrame(new_data)
        
        # Create an empty DataFrame with the exact feature names expected by the model
        expected_features = [
            ' Lunch Ordered Previous Day ', 
            ' Additional Order Lunch ',
            ' Total Order\n(F+G) ', 
            ' Lunch Actual ', 
            ' Occasion Lunch ',
            ' Snacks Ordered Previous day ', 
            ' Additional order Snacks ',
            ' Snacks Actual ', 
            ' Occasion Snacks ',
            'Facility_Bhageerath',
            'Facility_Ramanujan', 
            'Facility_Veda Complex', 
            'Day_Monday', 
            'Day_Saturday',
            'Day_Sunday', 
            'Day_Thursday', 
            'Day_Tuesday', 
            'Day_Wednesday'
        ]
        
        result_df = pd.DataFrame(0, index=range(1), columns=expected_features)
        
        # Convert Date to datetime for reference (not used in the model)
        if 'Date' in new_data.columns:
            new_data['Date'] = pd.to_datetime(new_data['Date'])
        
        # Set facility flag based on input
        if 'Facility' in new_data.columns:
            facility = new_data['Facility'].iloc[0]
            facility_col = f'Facility_{facility}'
            if facility_col in result_df.columns:
                result_df[facility_col] = 1
            
        # Set day flag based on input
        if 'Weekday' in new_data.columns:
            weekday = new_data['Weekday'].iloc[0]
            day_col = f'Day_{weekday}'
            if day_col in result_df.columns:
                result_df[day_col] = 1
        
        print("Final data shape:", result_df.shape)
        print("Final columns:", result_df.columns.tolist())
        
        return result_df
    except Exception as e:
        print(f"Preprocessing error: {str(e)}")
        print("Input data type:", type(new_data))
        print("Input data content:", new_data)
        raise Exception(f"Error in preprocessing: {str(e)}")

def predict_footfall(new_data_point, model_path='footfall_prediction_model.pkl'):
    """Make a prediction for new data"""
    try:
        # Preprocess the data
        preprocessed_data = preprocess_new_data(new_data_point)
        
        # Load the model
        model = joblib.load(model_path)
        
        # Make prediction
        prediction = model.predict(preprocessed_data)[0]                
        return float(prediction)
    except Exception as e:
        raise Exception(f"Error in prediction: {str(e)}")

if __name__ == "__main__":
    sample_data = {
        'Date': '2024-01-15',
        'Holiday': 0,
        'Weekday': 'Monday'
    }
    try:
        result = predict_footfall(sample_data)
        print(f"Predicted footfall: {result}")
    except Exception as e:
        print(f"Error: {e}")