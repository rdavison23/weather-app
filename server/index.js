import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
server.use(express.static(REACT_BUILD_DIR));
const port = process.env.PORT;

server.get('/', (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

server.get('/weather', (req, res) => {
  //From Andrew resolved CORS problem
  res.set('Access-Control-Allow-Origin', '*'); //It makes abuse easier then * lets anyone build a client that uses your API without permission

  const city = req.query.cityName;
 if (!city || city.trim().length === 0) {
    return res.status(400).json({ error: "City name is required." });
  }

  console.log(city);

  const apiKey = process.env.WEATHER_APP;
  console.log(apiKey);
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
// export default server;
 });
