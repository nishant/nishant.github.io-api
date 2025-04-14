import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

router.get('/', async (req: Request, res: Response) => {
  const {lat, lon} = req.query;
  
  if (!lat || !lon) {
    res.status(400).json({error: 'Latitude (lat) and Longitude (lon) are required'});
    return;
  }
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        exclude: 'minutely,alerts', // customize as needed
        units: 'imperial',
        appid: API_KEY
      }
    });
    
    const data = response.data;
    
    res.json({
      current: data.current,
      hourly: data.hourly.slice(0, 5), // just show next 5 hours
      daily: data.daily.slice(0, 3)    // just show next 3 days
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to fetch weather data',
      details: error.message
    });
  }
});

export default router;
