import './App.css';
import { useState } from 'react';
import WeatherForm from './components/weatherForm';
import WeatherCard from './components/weatherCard';
import dayImage from './components/day.jpg';
import nightImage from './components/night.jpg';

function App() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);

  const isDaytime = () => {
    if (!result) return true; //default before data loads
    const localUnix = result.dt + result.timezone;
    const localDate = new Date(localUnix * 1000);
    const hour = localDate.getUTCHours();

    return hour >= 6 && hour < 18;
  };

  //function to do the get request and set the state from the hard code data
  const loadCity = () => {
  fetch(`/weather?cityName=${encodeURIComponent(city)}`)
    .then((response) => {
      if (response.status === 204) {
        // no content
        setResult(null);
        return null;
      }

      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err?.message || "Server error");
        });
      }

      return response.json();
    })
    .then((payload) => {
      if (!payload) return;

      // payload should be { data: <openweather object> }
      if (!payload.data || !payload.data.main) {
        throw new Error(payload?.data?.message || "Weather data missing (bad city?)");
      }

      setResult(payload.data);
    })
    .catch((err) => {
      console.log("loadCity error:", err);
      setResult(null);
      // optional: show this in UI via an error state
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    // if event has info ,then load city, else ("no city given")
    if (city.length > 0) {
      loadCity();
    } else {
      console.log('no city given');
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
      {!result ? (
        <p className="click">Please click the button to see Data</p>
      ) : (
        <WeatherCard data={result} />
      )}
    </div>
  );
}

export default App;
