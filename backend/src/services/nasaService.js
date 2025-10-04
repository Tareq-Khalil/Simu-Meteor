import axios from 'axios';
import { Agent } from 'https';
import { NASA_API_KEY, NASA_BASE_URL } from '../../config/nasaConfig.js';

const agent = new Agent({ family: 4 }); // Force IPv4

export const fetchApod = async () => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
      params: { api_key: NASA_API_KEY },
      httpsAgent: agent,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from NASA API.');
  }
};

export const fetchNeoFeed = async (start_date, end_date) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/neo/rest/v1/feed`, {
      params: { api_key: NASA_API_KEY, start_date, end_date },
      httpsAgent: agent,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch NEO feed from NASA API.');
  }
};

export const fetchNeoById = async (id) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/neo/rest/v1/neo/${id}`, {
      params: { api_key: NASA_API_KEY },
      httpsAgent: agent,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch NEO by ID from NASA API.');
  }
};

export const fetchNeoBrowse = async (page = 1) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/neo/rest/v1/neo/browse`, {
      params: { api_key: NASA_API_KEY, page },
      httpsAgent: agent,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch NEO browse data from NASA API.');
  }
};

export const fetchRandomNeo = async () => {
  const response = await axios.get(`${NASA_BASE_URL}/neo/rest/v1/neo/browse`, {
    params: { api_key: NASA_API_KEY },
    httpsAgent: agent,
  });
  const neos = response.data.near_earth_objects;
  return neos[Math.floor(Math.random() * neos.length)];
};