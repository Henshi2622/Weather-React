
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faWind, faTint, faTachometerAlt, faCloud  , faEye } from "@fortawesome/free-solid-svg-icons"; 
import '@fontsource/roboto/400.css';  // Regular 
import "./info.css";
import Weather_card from './Weather_card';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GetIcon from "./Icon";
import countries from "world-countries";



export default function Info({info}){
    
    const [time, setTime] = useState(dayjs().format("hh:mm A"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("hh:mm A")); // 12-hour format with AM/PM
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
     //first letter - Capital 
    const capitalizeFirstLetter = (text) => {
       return text.charAt(0).toUpperCase() + text.slice(1);
    };
    
    // image 
    let weatherIcon = "/images/weather_image.png";

    // progress bar for humidity
    let value = <CircularProgressbar className="custom_progress_bar"
                value={info.humidity}  
                text={`${info.humidity}%`}  
                />
    
    // country code -> country name 
    const getCountryName = (code) => {
        const country = countries.find((c) => c.cca2 === code.toUpperCase());
        return country ? country.name.common : "Unknown Country";
      };

    //   UNIX timestamp - > hh:mm
    const sunriseTime = dayjs.unix(info.sunrise).format("hh:mm A");
    const sunsetTime = dayjs.unix(info.sunset).format("hh:mm A");
    
    return(
        <>
        <div className="middle_container">
            <div className="climate_view">
                <p id='current_weather'>Current Weather 
                    <span> {capitalizeFirstLetter(info.city)}</span>
                </p> 
                <p id="time">{time}</p>
                <div className="climate_info">
                    <div className="climate_temp">
                        <img src={weatherIcon} alt="weather" /> 
                        <h1>{`${(info.temp - 273.15).toFixed(2)}°C`}</h1>
                    </div>
                    <div className="description">
                        <p id="short_description"> {info.weather}</p>
                        <p id="feels_like"> Feels Like : {`${(info.feels_like - 273.15).toFixed(0)}°C`}</p>
                    </div>
                </div>
            </div>
            <div className="location_details">
                <GetIcon  icon = {faLocationDot} text = "Location"/>
                 <div className="lon_lat">  
                    <p>Latitude : <span>{info.lat}</span></p>
                    <p>Longitude : <span>{info.lon}</span></p>
                 </div>
                 <hr />
                 <p id="country_name">Country : {getCountryName(info.country_code)}</p>
            </div>
        </div>
        
        <br /> 
        <h3 id="highlights">Today's Highlights</h3>
        <div className="info_box_weather">
            <div className='Info_Box'> 
            <Weather_card   label ="Pressure" value={`${info.pressure} hPa`} icon={faTachometerAlt} />
            <Weather_card   label ="Wind Speed" value={`${info.wind} m/s`} icon={faWind} />    
            <Weather_card   label ="Description" value={info.description}  icon={faCloud}/>
            <Weather_card   label ="Visibility" value={`${info.visibility} m`}  icon={faEye}/>
            </div>
            <div>
            <Weather_card    id = "humidity" label ="Humidity" value={value}  icon={faTint}/>
            </div>
            <div className="sun">
                <div className="inner_sun">
                    <p> Sunrise  : {sunriseTime}</p>
                    <p>Sunset: {sunsetTime}</p>
                </div>
            </div>
        </div>
        
    </>
    )
}