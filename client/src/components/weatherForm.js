import { useState } from 'react';

const WeatherForm = (props) => {
  const [value, setValue] = useState('');

  function handleInputs(event) {
    //console.log(event.target.value);
    setValue(event.target.value);
    props.setCity(event.target.value);
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
          value={value}
          onChange={handleInputs}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default WeatherForm;
