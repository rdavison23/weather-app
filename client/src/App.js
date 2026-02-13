import './App.css';
import { useState } from 'react';
import WeatherForm from './components/weatherForm';
import WeatherCard from './components/weatherCard';
import dayImage from './components/day.jpg';
import nightImage from './components/night.jpg';

function App() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const isDaytime = () => {
    if (!result) return true;
    const localUnix = result.dt + result.timezone;
    const localDate = new Date(localUnix * 1000);
    const hour = localDate.getUTCHours();
    return hour >= 6 && hour < 18;
  };

  const loadCity = () => {
    setError('');

    fetch(`/weather?cityName=${encodeURIComponent(city)}`)
      .then((response) => {
        if (response.status === 204) {
          setResult(null);
          setError('No data returned.');
          return null;
        }

        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err?.error || err?.message || 'Server error');
          });
        }

        return response.json();
      })
      .then((payload) => {
        if (!payload) return;

        if (!payload.data || !payload.data.main) {
          throw new Error('Weather data missing (bad city?)');
        }

        setResult(payload.data);
      })
      .catch((err) => {
        setResult(null);
        setError(err?.message || 'Something went wrong.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city || city.trim().length === 0) {
      setResult(null);
      setError('City name is required.');
      return;
    }

    loadCity();
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
      }}
    >
      <WeatherForm setCity={setCity} handleSubmit={handleSubmit} />

      {error && <p className="click">{error}</p>}

      {!result ? (
        <p className="click">Please click the button to see Data</p>
      ) : (
        <WeatherCard data={result} />
      )}
    </div>
  );
}

export default App;
