# Weather App — React + Express + OpenWeatherMap

A full‑stack weather application built with React (Vite) on the frontend and ExpressJS + PostgreSQL on the backend.
The app fetches real‑time weather data from the [OpenWeatherMap](https://openweathermap.org/api),
allows users to save and update a favorite city, and displays a one‑day weather forecast with dynamic UI changes based on day/night conditions.

# Demo / Screenshot

DayTime
![dayTime screenshot](DayTime.png)
NightTime
![nightTime screenshot](NightTime.png)

# Project Objective

- Build a backend using ExpressJS
- Connect to a 3rd‑party API (OpenWeatherMap)
- Pass data from backend → frontend
- Store and update a user’s favorite city in PostgreSQL
- Render dynamic weather data in React
- Use forms + state to fetch weather based on user input
- Provide user‑visible error messages and input validation
- Include at least one test file using Vitest + React Testing Library

# Features

- Search weather by city name
- Displays:
  - Temperature (°F)
  - Humidity
  - Wind speed
  - Weather condition icon
  - City name
  - Dynamic day/night background

# Favorite City (CRUD)

- Save a favorite city for a user (Create)
- Fetch the user’s saved favorite city (Read)
- Update the favorite city (Update)
- (Optional) Remove favorite city (Delete — if implemented)

# Additional Functionality

- Responsive layout
- Backend proxy to hide API key
- Error handling for:
  - Invalid or unknown cities
  - Missing input
  - Server/API errors
- HTML input validation (required, placeholder, etc.)

# Backend Overview (Express + PostgreSQL)

- GET /api/weather/:city ----- Fetches weather data from OpenWeather API
- GET /api/users/:id ----- Returns user info + favorite city
- POST /api/users ----- Creates a new user with a favorite
- PUT /api/users/:id ----- Updates the user’s favorite city

# Database Schema

- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  favorite_city TEXT
  );
- Optional extra field: email TEXT

# Frontend Overview (React)

- City search input with validation
- Button to save favorite city
- Button to update favorite city
- Displays one‑day forecast from backend
- Shows error messages when:
  - City is invalid
  - API fails
  - Input is empty

# Installation & Setup

- Clone the repo
  - git clone (repo-url)
  - cd (project-folder)
- Install dependencies
- Environment Variables
- Create a .env file (not committed to Git):
  - OPENWEATHER_API_KEY=your_key_here
  - DATABASE_URL=postgres://user:password@localhost:5432/weather_app
  - Start the backend: npm run server
    -Start the frontend: npm run dev
