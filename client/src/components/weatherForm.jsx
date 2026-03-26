import { useState } from 'react';

const WeatherForm = ({ setCity, handleSubmit, loading }) => {
  const [value, setValue] = useState('');

  function handleInputs(event) {
    const newValue = event.target.value;
    setValue(newValue);
    setCity(newValue);
  }

  return (
    <div className="weather">
      <h1 className="App-header">Weather Forecast</h1>

      <form onSubmit={handleSubmit}>
        <input
          id="city-name"
          type="text"
          placeholder="Please enter the city name"
          name="city"
          value={value}
          onChange={handleInputs}
          required
          minLength={2}
          autoComplete="off"
        />

        <input
          type="submit"
          value={loading ? 'Loading...' : 'Submit'}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default WeatherForm;
