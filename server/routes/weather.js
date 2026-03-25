import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const city = req.query.cityName;

  if (!city || city.length === 0) {
    return res.status(400).json({ error: 'City name is required.' });
  }

  const apiKey = process.env.WEATHER_APP;
  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'imperial',
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return res
          .status(404)
          .json({ error: 'City not found. Check the spelling and try again.' });
      }
      return res
        .status(500)
        .json({ error: 'Unable to fetch weather. Please try again.' });
    }

    const data = await response.json();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected error fetching weather data.' });
  }
});

export default router;
