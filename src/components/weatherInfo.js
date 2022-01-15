import React, { useMemo } from 'react';
import './css/weatherInfo.css';

export default function WeatherInfo(props) {
    // console.log(props.weather);
    let data = props.weather;

    // //0 is the key sets to epoch date
    // memo candidate!!!!!!!!!!
    const getTime = () => {
        console.log("called getTime")
        let epochDateTime = new Date(data.dt * 1000);
        // let dateTime = epochDateTime.toLocaleString('en-CA');
        return epochDateTime.toLocaleString('en-CA');
    }

    const memorisedTimeJSX = useMemo(() => {
        console.log("xacasdfasdsadasd");
        let epochDateTime = new Date(data.dt * 1000);
        return epochDateTime.toLocaleString('en-CA')    
    }, [data.dt])
    

    return (
        <div className='weather-info'>
            <p className='weather-label'>{data.sys ? `${data.name}, ${data.sys.country}` : null}</p>
            <p className='weather-title'>{data.weather ? data.weather[0].main : null}</p>
            <p className='weather-label'>Description: <span>{data.weather ? data.weather[0].description : null}</span></p>
            <p className='weather-label'>Temperature: <span>{data.main ? `${data.main.temp_min}°F ~ ${data.main.temp_max}°F`  : null}</span></p>
            <p className='weather-label'>Humidity: <span>{data.main ? `${data.main.humidity}%` : null}</span></p>
            <p className='weather-label'>Time: <span>{data.dt ? memorisedTimeJSX : null}</span></p>
        </div>
    )
}
