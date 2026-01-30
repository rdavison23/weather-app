const WeatherCard = (props) => {
  const roundedTemp = Math.round(props.data.main.temp);
  const feelsLike = Math.round(props.data.main.feels_like);
  return (
    <div className="weather-card">
      <div className="result">
        <p>
          City:{' '}
          <span className="data">
            {props.data.name}, {props.data.sys.country}
          </span>
        </p>
        <p>
          Description:{' '}
          <span className="data">{props.data.weather[0].description}</span>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@4x.png`}
          alt={'Icon from Open Weather Api'}
        />
        <p>
          Temperature:{' '}
          <span className="data">
            {roundedTemp} <sup>o</sup>F
          </span>
        </p>
        <p>
          Feels Like:{' '}
          <span className="data">
            {feelsLike} <sup>o</sup>F
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
