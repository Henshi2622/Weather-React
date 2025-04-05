import TextField from '@mui/material/TextField'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function Cast(){
    let [city,setCity]= useState(" ");
    let[error ,setError] = useState(false);


    const API_KEY = "4e878265109018f7ff2e6912c34dca52";
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast`;

    let forecast = async ()=>{
        let f_response = await fetch(`${FORECAST_API}?q=${city}&appid=${API_KEY}`);
        let f_data =await f_response.json();
        console.log(f_data);

        // forecastByDate = {
        //     "2025-04-07": [
        //       { dt_txt: "2025-04-07 00:00:00", ... },
        //       { dt_txt: "2025-04-07 03:00:00", ... },
        //       { dt_txt: "2025-04-07 06:00:00", ... },
        //       ...
        //     ],
        //     "2025-04-08": [
        //       { dt_txt: "2025-04-08 00:00:00", ... },
        //       ...
        //     ]
        //   };
          
        const forecastByDate ={}; // store entry according to date
        f_data.list.forEach(element => {
            const date = element.dt_txt.split(" ")[0];
            if(!forecastByDate[date]) {
                forecastByDate[date] =[];
            }
            forecastByDate[date].push(element);
        });
        // console.log("Grouped forecast by date:", forecastByDate);
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

    return(
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
    )
}