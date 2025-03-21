import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MenuItem, Select, Button, Container, Box, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const facilities = [
    { id: 1, name: 'Facility 1' },
    { id: 2, name: 'Facility 2' },
    { id: 3, name: 'Facility 3' },
    { id: 4, name: 'Facility 4' }
  ];

  const handleSubmit = async () => {
    // Simulating API call
    try {
      const response = {
        success: true,
        data: {
          facility: selectedFacility,
          date: selectedDate,
          bookingId: Math.floor(Math.random() * 1000000)
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApiResponse(response);
    } catch (error) {
      setApiResponse({ success: false, error: 'Failed to make booking' });
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
          disabled={!selectedFacility || !selectedDate}
        >
          Predict
        </Button>

        {apiResponse && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6">Booking Details:</Typography>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App; 