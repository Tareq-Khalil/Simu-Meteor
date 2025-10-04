import dotenv from 'dotenv';
dotenv.config();

export const NASA_API_KEY = process.env.NASA_API_KEY;
export const NASA_BASE_URL = 'https://api.nasa.gov';