import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [weather, setWeather] = useState({});
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
    setError("");
    setToggle(false);
    //console.log(e.target.value);
  };

  const handleFetch = () => {
    const location = searchValue;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6e26b1ef92a1ad9aa5322fa1d65f358d`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.cod === "404" || data.cod === "400") {
          setError("Location Not Found");
        } else {
          setWeather(data);
          //console.log(weather);
          setToggle(true);
          setSearchValue("");
        }
      });
  };

  return (
    <div className='App'>
      <div className="weather">
        <section id="current">
          {toggle ? (
            <div className='forecast'>
              <h3>
                {Math.floor(weather.main.temp)}
                <span>&deg;</span>C
              </h3>
              <h3>{weather.weather[0].main}</h3>
              <h5>{weather.weather[0].description}</h5>
              <img 
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              />
            </div>
          ) : null}
        </section>
        <div id="search">
          <input
            name="searchBar"
            id="searchBar"
            value={searchValue}
            onChange={handleInput}
          />
          <br />
          <button id="search-btn" onClick={handleFetch}>
            Search Weather
            <span>&nbsp;&nbsp;&nbsp;</span>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <section id="weekly">
          {toggle ? (
                <h2>
              {weather.name},{weather.sys.country}
            </h2>
          ) : (
            <h2>{error}</h2>
          )}
          {toggle ? (
            <div className='highlow'>
              <h4>Min:<span>&nbsp;</span> 
                {weather.main.temp_min}
                <span>&deg;</span>C
              </h4>
              <h4>Max:<span>&nbsp;</span>
                {weather.main.temp_min}
                <span>&deg;</span>C
              </h4>
            </div>
          ) : null}
          {toggle ? <h4>Humidity: <span>&nbsp;</span>{weather.main.humidity}</h4>:null}
        </section>
      </div>
    </div>
  );
}

export default App;
