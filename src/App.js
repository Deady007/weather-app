import "./App.css";
import { useState } from "react";

const api = {
  key: "7c65ac4c565b878fd78a872637900dfc", 
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const getBackground = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "url('/images/clear.jpg')";
      case "clouds":
        return "url('/images/cloudy.jpg')";
      case "rain":
        return "url('/images/rainy.jpg')";
      case "snow":
        return "url('/images/snowy.jpg')";
      case "thunderstorm":
        return "url('/images/stormy.jpg')";
      default:
        return "url('/images/default.jpg')";
    }
  };

  const searchPressed = () => {
    if (!search.trim()) {
      alert("Please enter a city/town!");
      return;
    }

    setLoading(true);

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };
  console.log(getBackground(weather.weather ? weather.weather[0].main : 'default'));

  return (
    <div
      className="App"
      style={{
        backgroundImage: weather.weather
          ? getBackground(weather.weather[0].main)
          : "url('/images/default.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <header className="App-header">
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : typeof weather.main !== "undefined" ? (
          <div className="weather-info">
            <p>📍 {weather.name}</p>
            <p>🌡️ {weather.main.temp}°C</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌍 {weather.weather[0].main} ({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
        
      </header>
    </div>
  );
}

export default App;
