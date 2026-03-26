import express from 'express';
import pool from '../db.js';
import weatherRouter from './weather.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const { username, email, favoritecity } = req.body;

    if (!username || username.trim().length < 2) {
      return res.status(400).json({
        error:
          'Username is required and must be at least 2 or more characters.',
      });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }
    const result = await pool.query(
      `INSERT INTO users (username, email, favorite_city)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [username, email, favoritecity || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//Get user by ID
router.get('/:id', async (req, res, next) => {
  console.log('req.params.id:', req.params.id);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'user not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//Update favorite city
router.put('/:id/favorite-city', async (req, res, next) => {
  try {
    const { favoriteCity } = req.body;

    if (!favoriteCity || favoriteCity.trim().length < 2) {
      return res.status(400).json({
        error: 'Favorite city is required and must be at least 2 characters.',
      });
    }

    const result = await pool.query(
      `UPDATE users
         SET favorite_city = $1
         WHERE id = $2
         RETURNING *`,
      [favoriteCity, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
