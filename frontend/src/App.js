import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MenuItem, Select, Button, Container, Box, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function App() {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const facilities = [
    { id: 1, name: 'Facility 1' },
    { id: 2, name: 'Facility 2' },
    { id: 3, name: 'Facility 3' },
    { id: 4, name: 'Facility 4' }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateObj = new Date(selectedDate);
      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const isHoliday = 0; // You might want to add holiday detection logic here

      const response = await axios.post('http://localhost:8000/predict', {
        date: dateObj.toISOString().split('T')[0],
        holiday: isHoliday,
        weekday: weekday
      });

      setApiResponse(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to get prediction');
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

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedFacility || !selectedDate || loading}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </Button>

        {error && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#ffebee', borderRadius: 1 }}>
            <Typography color="error">{error}</Typography>
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
              <strong>Predicted Footfall:</strong> {apiResponse.predicted_footfall?.toFixed(2)}
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