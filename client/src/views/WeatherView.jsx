import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const isDaytime = () => {
    if (!result) return true;
    const localUnix = result.dt + result.timezone;
    const localDate = new Date(localUnix * 1000);
    const hour = localDate.getUTCHours();
    return hour >= 6 && hour < 18;
  };

  const loadCity = async () => {
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/weather?cityName=${city}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to fetch weather.');
        setLoading(false);
        return;
      }

      setResult(data.data);
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
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
      setSavingFavorite(true);
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
        setSavingFavorite(false);
        return;
      }

      setUser((prev) => ({ ...prev, favorite_city: data.favorite_city }));
      alert(`Favorite city updated to ${data.favorite_city}`);
    } catch (err) {
      setError('Something went wrong saving your favorite city.');
    }
    setSavingFavorite(false);
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
        padding: '20px',
      }}>
      {/* --- USER BAR (Welcome + Favorite City + Logout) --- */}
      {user && (
        <div className="user-bar" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '1.2rem' }}>
            Welcome, <strong>{user.username}</strong>
            {user.favorite_city && (
              <>
                {' '}
                — Favorite city: <strong>{user.favorite_city}</strong>
              </>
            )}
          </p>

          <button
            className="logout-btn"
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              marginTop: '8px',
              cursor: 'pointer',
            }}>
            Logout
          </button>
        </div>
      )}

      {/* --- Weather Form --- */}
      <WeatherForm
        setCity={setCity}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {/* --- error message --- */}
      {error && <p className="error">{error}</p>}

      {/* --- weather result --- */}
      {!result ? (
        <p className="click">Please click the button to see Data</p>
      ) : (
        <>
          <WeatherCard data={result} />

          {/* --- Save Favorite button (only if logged in) --- */}
          {user && (
            <button
              className="favorite-btn"
              onClick={() => saveFavoriteCity(city)}
              disabled={savingFavorite}
              style={{
                marginTop: '15px',
                padding: '8px 14px',
                cursor: 'pointer',
              }}>
              {savingFavorite ? 'Saving...' : 'Save as Favorite'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default WeatherView;
