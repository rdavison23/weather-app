import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/weather', (req, res) => {
  const city = req.query.cityName;
  console.log(city);
  const apiKey = process.env.WEATHER_APP;
  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'imperial',
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
