import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import weatherRouter from './routes/weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');

server.use(express.json());
server.use(express.static(REACT_BUILD_DIR));

// API routes
server.use('/weather', weatherRouter);

// Serve React app
server.get('/', (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
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
