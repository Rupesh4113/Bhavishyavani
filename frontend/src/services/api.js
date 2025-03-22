import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const predictFootfall = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, {
      date: data.date,
      holiday: data.holiday,
      weekday: data.weekday
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to predict footfall');
  }
};

export const getWelcomeMessage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch welcome message');
  }
}; 