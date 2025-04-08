import TextField from '@mui/material/TextField'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import "./Forecast.css";
import OutlinedCard from "./Forecast_card";
import dayjs from "dayjs";

export default function Cast() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [forecastInfo, setForecastInfo] = useState("");

  const API_KEY = "4e878265109018f7ff2e6912c34dca52";
  const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast`;

  const forecast = async () => {
    try {
      const f_response = await fetch(`${FORECAST_API}?q=${city}&appid=${API_KEY}&units=metric`);
      const f_data = await f_response.json();

      const forecastByDate = {};

      f_data.list.forEach(element => {
        const date = element.dt_txt.split(" ")[0];
        if (!forecastByDate[date]) {
          forecastByDate[date] = [];
        }
        forecastByDate[date].push(element);
      });

      const daily_result = [];

      for (const i in forecastByDate) {
        const element = forecastByDate[i];
        const daily_data = element.find(e => e.dt_txt.includes("12:00:00"));
        if (daily_data) {
          daily_result.push(daily_data);
        }
      }
      console.log(daily_result);

      const forecast_info = {
        city:city ,
        temp: daily_result[0].main.temp,
        feels_like: daily_result[0].main.feels_like,
        description: daily_result[0].weather[0].description,
        visibility: f_data.city.visibility, // fallback if not in daily_result
        wind_speed: daily_result[0].wind.speed,
      };

      setForecastInfo(forecast_info);
      setError(false);
    } catch (err) {
      setError(true);
      setForecastInfo(null);
      console.error("Forecast fetch failed:", err);
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await forecast();
    setCity("");
  };

  const dates = Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i + 1, "day").format("DD-MM-YYYY")
  );

  //first letter - Capital 
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
 };

  return (
    <div className = "forecast_container">
      <div className="SearchBoxWrapper">
        <div className="city_name">
         {forecastInfo.city}
        </div>
        <form onSubmit={handleSubmit} className="search_form">
          <TextField
            id="standard-basic"
            label="Enter City"
            variant="standard"
            required
            value={city}
            onChange={handleChange}
          />
          <IconButton
            id="search_icon"
            type="submit"
            aria-label="search"
            sx={{ color: "blue" }}
          >
            <SearchIcon />
          </IconButton>
          {error && <p style={{ color: "red" }}>No such place exists!</p>}
        </form>
    </div>


    <div className="daily_weather">
        <OutlinedCard date={dates[0]} info={forecastInfo} />
    </div>
  </div>
     
   
  );
}
