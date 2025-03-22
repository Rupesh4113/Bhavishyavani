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

def preprocess_new_data(new_data):
    """Preprocess new data for prediction"""
    try:
        # Convert to DataFrame if not already
        if not isinstance(new_data, pd.DataFrame):
            new_data = pd.DataFrame([new_data])
            
        # Convert Date to datetime
        new_data['Date'] = pd.to_datetime(new_data['Date'])
        new_data = new_data.set_index('Date')
        
        # Add required columns with default values
        required_columns = [
            'Additional Order Lunch',
            'Additional order Snacks',
            'Lunch Actual',
            'Lunch Ordered Previous Day',
            'Occasion Lunch',
            'Occasion Snacks',
            'Snacks Actual',
            'Snacks Ordered Previous Day'
        ]
        
        for col in required_columns:
            new_data[col] = 0  # Set default values
        
        # Convert categorical variables to dummy variables
        new_data = pd.get_dummies(new_data, columns=['Weekday'], drop_first=True)
        
        # Ensure all required dummy columns exist
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        for day in weekdays[1:]:  # Skip first day as it's dropped
            col = f'Weekday_{day}'
            if col not in new_data.columns:
                new_data[col] = 0
                
        return new_data
    except Exception as e:
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