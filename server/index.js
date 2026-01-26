import 'dotenv/config';
import express from 'express';

const server = express();
const port = process.env.PORT;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/weather', (req, res) => {
  //From Andrew resolved CORS problem
  res.set('Access-Control-Allow-Origin', '*'); //It makes abuse easier then * lets anyone build a client that uses your API without permission
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
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
