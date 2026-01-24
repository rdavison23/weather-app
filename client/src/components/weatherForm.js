import { useState } from 'react';

const WeatherForm = (props) => {
  const [values, setValues] = useState('');
  function handleInputs(event) {
    console.log(event.target.value);
    setValues(event.target.value);
  }
  return (
    <div className="weather">
      <h1 className="App-header">Weather Forecast App</h1>
      <form onSubmit={props.handleSubmit}>
        <input
          id="city-name"
          type="text"
          placeholder="Please enter the city name"
          name="city"
          value={values}
          onChange={handleInputs}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default WeatherForm;
