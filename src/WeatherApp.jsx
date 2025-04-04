import SearchBox from "./search";
import Info from "./info";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp(){
    let [weather_info , setWeather_info]=useState({
        city: " City",
        lat : 0.00,
        lon :0.00,
        temp: 273.15,
        feels_like: 273.15,
        humidity: 0,
        pressure: 0,
        visibility : 0,
        description: " ",
        weather : " hazy ",
        wind: "0",
        country_code: " ",
        sunrise : " ",
        sunset : ""
    })
    let updateInfo = (newInfo) =>{
        setWeather_info(newInfo);
    }
  
    return(
        <div className="weather-container"> 
            <SearchBox updateInfo = {updateInfo}/>
            <Info info={weather_info}/> 
        </div>
    )
}