import { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Weathercheck = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1989dd0a1bdfb855088deb78d5e4ba0&units=metric`
      );
      const data = await url.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setCity("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-4">
      <div className="bg-white/90 shadow-xl rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Weather App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={Weathercheck}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-blue-600 font-medium">Loading...</p>
        )}

        {weather && (
          <div className="space-y-2 text-gray-700 bg-blue-50 rounded-lg p-4">
            <p>
              <span className="font-semibold">Sky Condition:</span>{" "}
              {weather.weather[0].description}
            </p>
            <p>
              <span className="font-semibold">Temperature:</span>{" "}
              {weather.main.temp}°C
            </p>
            <p>
              <span className="font-semibold">Feels Like:</span>{" "}
              {weather.main.feels_like}°C
            </p>
            <p>
              <span className="font-semibold">Humidity:</span>{" "}
              {weather.main.humidity}%
            </p>
            <p>
              <span className="font-semibold">Wind:</span>{" "}
              {weather.wind.speed} km/h
            </p>
            <p>
              <span className="font-semibold">Location:</span> {weather.name},{" "}
              {weather.sys.country}
            </p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold mt-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
