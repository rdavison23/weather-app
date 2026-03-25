import 'dotenv/config';
import express from 'express';
import weatherRouter from './routes/weather.js';

const server = express();
server.use(express.json());

// API routes
server.use('/weather', weatherRouter);

// Serve React app
server.get('/', (req, res) => {
  res.send('Okay!');
});

// Basic error handler
server.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Something went wrong.' });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
