import axios from 'axios';

// const baseURL = 'https://api.jikan.moe/v4';
const baseURL = 'https://dummyjson.com/users';

const client = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
client.interceptors.request.use(
);

// Response interceptor
client.interceptors.response.use(
);

export const get = async (endpoint, params = {}) => {
  try {
    const response = await client.get(endpoint, { params });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    else {
      throw new Error('GET request failed with status ' + response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error('GET request error. status: ' + error.response.status);
      throw new Error('GET request failed with status ' + error.response.status);
    }
    else {
      console.error('GET request error. ' + error.message);
      throw error;
    }
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await client.post(endpoint, data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    else {
      throw new Error('POST request failed with status ' + response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error('POST request error. status: ' + error.response.status);
      throw new Error('POST request failed with status ' + error.response.status);
    }
    else {
      console.error('POST request error. ' + error.message);
      throw error;
    }
  }
};

export const put = async (endpoint, data) => {
  try {
    const response = await client.put(endpoint, data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    else {
      throw new Error('PUT request failed with status ' + response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error('PUT request error. status: ' + error.response.status);
      throw new Error('PUT request failed with status ' + error.response.status);
    }
    else {
      console.error('PUT request error. ' + error.message);
      throw error;
    }
  }
};

export const del = async (endpoint, data) => {
  try {
    const response = await client.delete(endpoint, data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    else {
      throw new Error('DELETE request failed with status ' + response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error('DELETE request error. status: ' + error.response.status);
      throw new Error('DELETE request failed with status ' + error.response.status);
    }
    else {
      console.error('DELETE request error. ' + error.message);
      throw error;
    }
  }
};