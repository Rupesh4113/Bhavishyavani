import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MenuItem, Select, Button, Container, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function App() {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isHoliday, setIsHoliday] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const facilities = [
    { id: 1, name: 'Bhageerath' },
    { id: 2, name: 'Ramanujan' },
    { id: 3, name: 'Veda Complex' }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateObj = new Date(selectedDate);
      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      // Convert boolean to integer (0 or 1)
      const holidayValue = isHoliday ? 1 : 0;

      const response = await axios.post('http://localhost:8000/predict', {
        date: dateObj.toLocaleString().split(',')[0],
        holiday: holidayValue,
        weekday: weekday,
        facility: selectedFacility
      });

      if (response.data.error) {
        throw new Error(response.data.message || response.data.error);
      }

      setApiResponse(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to get prediction');
      setApiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bhavishyavani
        </Typography>

        <Select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select a Facility
          </MenuItem>
          {facilities.map((facility) => (
            <MenuItem key={facility.id} value={facility.name}>
              {facility.name}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ 
          '& .react-datepicker-wrapper': { 
            width: '100%'
          }
        }}>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            customInput={
              <input
                style={{
                  padding: '14px',
                  width: '100%',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            }
          />
        </Box>

        <FormControlLabel 
          control={
            <Checkbox 
              checked={isHoliday}
              onChange={(e) => setIsHoliday(e.target.checked)}
              color="primary"
            />
          } 
          label="Mark as holiday"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedFacility || !selectedDate || loading}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </Button>

        {error && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#ffebee', borderRadius: 1 }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}

        {apiResponse && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Prediction Results:</Typography>
            <Typography>
              <strong>Facility:</strong> {selectedFacility}
            </Typography>
            <Typography>
              <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Holiday:</strong> {isHoliday ? 'Yes' : 'No'}
            </Typography>
            <Typography>
              <strong>Predicted Footfall:</strong> {
                typeof apiResponse.predicted_footfall === 'number' 
                  ? apiResponse.predicted_footfall.toFixed(2) 
                  : 'No prediction available'
              }
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
              Prediction made at: {new Date(apiResponse.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App; 