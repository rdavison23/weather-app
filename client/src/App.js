import './App.css';
import { useState } from 'react';
import WeatherForm from './components/weatherForm';
import WeatherCard from './components/weatherCard';

function App() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);

  //function to do the get request and set the state from the hard code data
  const loadCity = () => {
    fetch(`http://localhost:3001/weather?cityName=${city}`)
      .then((response) => {
        console.log('we got a response', response);
        if (response.status === 204) {
          console.log('no city');
        }
        return response.json();
      })
      .then((result) => {
        console.log('after fech reult is :', result);
        // setCity(result.weather[0].name);
        setResult(result.data);
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
    <div className="App">
      <WeatherForm setCity={setCity} handleSubmit={handleSubmit} />
      {!result ? (
        <p>Please click the button to see Data</p>
      ) : (
        <WeatherCard data={result} />
      )}
    </div>
  );
}

export default App;
