import TextField from '@mui/material/TextField'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
import GetIcon from './Icon';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


function SearchBox({updateInfo}) {

  let [city,setCity]= useState("");
  let[error ,setError] = useState(false);

  let API_URL ="https://api.openweathermap.org/data/2.5/weather";
  let API_key = "4e878265109018f7ff2e6912c34dca52";

  
  let getWeather = async () => {
    try{
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_key}`);
      let response_json = await response.json();
      console.log(response_json);
      let result = {
        city : city,
        temp : response_json.main.temp,
        feels_like: response_json.main.feels_like,
        humidity : response_json.main.humidity,
        pressure : response_json.main.pressure,
        description : response_json.weather[0].description,
        visibility : response_json.visibility,
        weather : response_json.weather[0].main,
        wind : response_json.wind.speed,
        lon : response_json.coord.lon,
        lat :  response_json.coord.lat,
        country_code : response_json.sys.country,
        sunrise: response_json.sys.sunrise,
        sunset: response_json.sys.sunset
      }
      return result ;
    } catch(err){
       throw err;
    }
  };

   let handleChange= (evt)=>{
      setCity(evt.target.value);
   }

   let handleSubmit = async (evt)=>{
    try{
    evt.preventDefault();
    console.log(city);
    setCity("");
    let newInfo = await getWeather();
    updateInfo(newInfo);
   } catch(err){
    setError(true);
   }
  };
  

    return (
      <>
        
        <div className="SearchBox">
          <form onSubmit={handleSubmit}> 
            <TextField id="standard-basic" label="Enter City  " variant="standard"  required  value={city}
                onChange={handleChange}
            /> 
              
            <IconButton  id = "search_icon" type="submit"  aria-label="search"  sx={{ color: "blue" }} >
                <SearchIcon />
            </IconButton>
            
          {error && <p style={{color:"red"}}> No Such Place Exist!</p>}
          </form>
        </div>
      </>
      
    );
  }
  
  export default SearchBox;
  
 