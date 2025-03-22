# Bhavishyavani - Footfall Prediction System

A machine learning system to predict footfall at different facilities based on historical data.

## Overview

Bhavishyavani (meaning "prediction" in Hindi) is a system that predicts footfall at different facilities. It processes input data like date, weekday, and facility to provide accurate predictions that help with resource planning.

## Features

- REST API for footfall predictions
- Frontend interface for easy interaction
- Supports predictions for multiple facilities
- Takes into account weekday and holiday information

## Project Structure

- `predict_model.py` - Core prediction logic and preprocessing functions
- `main.py` - FastAPI server implementation
- `footfall_prediction_model.pkl` - Trained ML model
- `Footfall.csv` - Historical data used for training
- `frontend/` - Web interface for the prediction system

## Installation

1. Clone the repository
2. Install backend dependencies:

```bash
pip install -r requirements.txt
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

## Usage

### Running the Backend Server

```bash
python main.py
```

The API server will start at `http://0.0.0.0:8000`

### Running the Frontend Application

```bash
cd frontend
npm start
```

The frontend application will start at `http://localhost:3000`

### Accessing the Complete Application

1. Start the backend server as described above
2. Start the frontend application in a separate terminal
3. Open your browser and navigate to `http://localhost:3000`
4. Use the web interface to input prediction parameters and receive footfall forecasts

### API Endpoints

- `GET /` - Welcome message
- `POST /predict` - Make a footfall prediction

### Example API Request

```json
{
  "date": "2024-01-15",
  "holiday": 0,
  "weekday": "Monday",
  "facility": "Ramanujan"
}
```

## Model Information

The prediction model uses regression techniques trained on historical footfall data. Predictions are based on:
- Day of the week
- Facility location
- Holiday status
- Historical attendance patterns

## Development

To modify the model or preprocessing:
1. Update the appropriate functions in `predict_model.py`
2. Test your changes with sample data
3. Deploy to production after validation

### Frontend Development

The frontend is built with React and uses:
- Material UI for components
- Axios for API requests
- React DatePicker for date selection

To modify the frontend:
1. Make changes to files in the `frontend/src` directory
2. Test changes with `npm start` in the frontend directory
3. Build for production with `npm run build`

## License

This project is proprietary software.
