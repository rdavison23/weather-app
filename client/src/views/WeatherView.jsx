import { useState } from 'react';
import WeatherForm from '../components/weatherForm';
import WeatherCard from '../components/weatherCard';
import Register from '../components/Register';
import dayImage from '../components/day.jpg';
import nightImage from '../components/night.jpg';

function WeatherView() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const isDaytime = () => {
    if (!result) return true;
    const localUnix = result.dt + result.timezone;
    const localDate = new Date(localUnix * 1000);
    const hour = localDate.getUTCHours();
    return hour >= 6 && hour < 18;
  };

  const loadCity = async () => {
    setError('');

    try {
      const response = await fetch(`/weather?cityName=${city}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Unable to fetch weather.');
        return;
      }

      const result = await response.json();
      setResult(result.data);
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim().length === 0) {
      setError('Please enter a city name.');
      return;
    }
    loadCity();
  };

  const saveFavoriteCity = async (cityName) => {
    if (!user) {
      setError('You must register before saving a favorite city.');
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}/favorite-city`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteCity: cityName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not save favorite city.');
        return;
      }

      setUser((prev) => ({ ...prev, favorite_city: data.favorite_city }));
      alert(`Favorite city updated to ${data.favorite_city}`);
    } catch (err) {
      setError('Something went wrong saving your favorite city.');
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${
          result ? (isDaytime() ? dayImage : nightImage) : dayImage
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}>
      <WeatherForm setCity={setCity} handleSubmit={handleSubmit} />

      {error && <p className="error">{error}</p>}

      {!result ? (
        <p className="click">Please click the button to see Data</p>
      ) : (
        <>
          <WeatherCard data={result} />

          {user && (
            <button
              className="favorite-btn"
              onClick={() => saveFavoriteCity(city)}>
              Save as Favorite
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default WeatherView;
