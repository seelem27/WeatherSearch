import React, { useState, useCallback, useMemo } from 'react';
import './css/weather.css';
import WeatherInfo from '../components/weatherInfo';
import SearchHistory from '../components/searchHistory';
import axios from 'axios';

export default function Weather() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [data, setData] = useState({});
    const [weatherHistories, setWeatherHistories] = useState(JSON.parse(localStorage.getItem('weatherHistories')) || []);

    const KEY = 'c8e63570cfd1d95c0766796a0a4ca6cc';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    
    const searchWeather = async(city, country) => {
        let httpParams = {q :  city + "," + country, APPID : KEY  }
        let searchParams = new URLSearchParams(httpParams);
        const result = await axios(
            BASE_URL + searchParams.toString()
        );
        console.log(result.data)
        const newHistories = [...weatherHistories]
        newHistories.unshift(result.data)
        setWeatherHistories(newHistories);
        localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
        setData(result.data);
    }

    const deleteWeather = (i) => {
        const newHistories = [...weatherHistories]
        newHistories.splice(i, 1);        
        localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
        setWeatherHistories(newHistories);
    }

    const clearAllHistory = () => {
        localStorage.removeItem('weatherHistories');
        setWeatherHistories([]);
    }

    return (
        <div className="container">
            <div className='header'>
                <p className='title'>Today's Weather</p>
                <hr />
            </div>    
            <div className='weather-content'>
                <div className='searchBar-container'>
                    <form>
                        <div className='label-input'>
                            <label htmlFor='city'>City: </label>
                            <input type='text' id='city' onChange={e => setCity(e.target.value)}/>
                        </div>
                        <div className='label-input'>
                            <label htmlFor='country'>Country: </label>
                            <input type='text' id='country' onChange={e => setCountry(e.target.value)}/>
                        </div>
                        <button className='button' type="button" onClick={() => searchWeather(city, country)}>Search</button>
                        <button className='button' type='reset'>Clear</button>
                    </form>
                </div>                   
                <WeatherInfo weather={data}/>
                <SearchHistory weatherHistories={weatherHistories} searchWeather={searchWeather} deleteWeather={deleteWeather} clearAllHistory={clearAllHistory} />
            </div>
        </div>
    )
}
