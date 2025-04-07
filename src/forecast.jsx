import TextField from '@mui/material/TextField'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import OutlinedCard from"./Forecast_card";
import dayjs from "dayjs";

export default function Cast(){
    let [city,setCity]= useState(" ");
    let[error ,setError] = useState(false);


    const API_KEY = "4e878265109018f7ff2e6912c34dca52";
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast`;

  

    let forecast = async ()=>{
        let f_response = await fetch(`${FORECAST_API}?q=${city}&appid=${API_KEY}`);
        let f_data =await f_response.json();

        // store entry according to date
        const forecastByDate ={}; 
        f_data.list.forEach(element => {
            const date = element.dt_txt.split(" ")[0];
            if(!forecastByDate[date]) {
                forecastByDate[date] =[];
            }
            forecastByDate[date].push(element);
        });
        
        // accesing each day entery
        let daily_result=[]
        for (const i in forecastByDate){
            const element = forecastByDate[i];
            const daily_data = element.find(e => e.dt_txt.includes("12:00:00"));
            daily_result.push(daily_data);
        }
        console.log(daily_result);

        let forecast_info={
            temp : daily_result[1].main.temp
        }

    }
    let handleChange= (evt)=>{
        setCity(evt.target.value);
    }
     let handleSubmit = async (evt)=>{
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            forecast();
        }catch(err){
            setError(true);
        }
        
    }
    const dates = Array.from({ length: 5 }, (_, i) => 
        dayjs().add(i + 1, "day").format("DD-MM-YYYY")
      );
        
    

    return(
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
        <div className='daily_weather'>
            <OutlinedCard date={dates[1]}  />
        </div>
        </>
        
    )
}