import React, { useState } from 'react';
import WeatherInfo from '../components/WeatherInfo';
import SearchHistory from '../components/SearchHistory';
import axios from 'axios';

import '../styles/pages/weather.css';
import '../styles/responsive/weather.css';

export default function Weather() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [data, setData] = useState({});
    const [weatherHistories, setWeatherHistories] = useState(JSON.parse(localStorage.getItem('weatherHistories')) || []);
    const [error, setError] = useState(false);
    const [showToggle, setShowToggle] = useState(false);

    const KEY = 'c8e63570cfd1d95c0766796a0a4ca6cc';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    let httpParams;

    const resetStateToDefault = () => {
        setCity('');
        setCountry('');
    }

    const searchWeather = async(city, country) => {
        if(city === "") httpParams = {q : country, APPID : KEY}
        else if(country === "") httpParams = {q : city, APPID : KEY}
        else httpParams = {q : city + "," + country, APPID : KEY}

        let searchParams = new URLSearchParams(httpParams);

        try {
            const result = await axios.get(BASE_URL + searchParams.toString());
            let responseData = result.data
            responseData.current_time = new Date().toLocaleTimeString()
            const newHistories = [...weatherHistories];
            newHistories.unshift(responseData);
            setWeatherHistories(newHistories);
            localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
            setData(responseData);
            setError(false);
            setShowToggle(true);
        } catch(err) {
            if(err.response.status === 404) {
                setError(true); 
                setShowToggle(true)
            }
        }        
    }

    const deleteWeather = (i) => {
        const newHistories = [...weatherHistories];
        newHistories.splice(i, 1);        
        localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
        setWeatherHistories(newHistories);

        (Array.isArray(newHistories) && newHistories.length) ? setShowToggle(true) : setShowToggle(false); 
    }

    const clearAllHistory = () => {
        localStorage.removeItem('weatherHistories');
        setWeatherHistories([]);
        setShowToggle(false);
    }

    return (
        <div className="container">
            <div className='header'>
                <p className='title'>Today's Weather</p>
                <hr />
            </div>    
            <div className='weather-content'>
                <form>
                    <div className='searchBar-container'>
                        <div className='label-input'>
                            <label htmlFor='city'>City: </label>
                            <input type='text' id='city' onInput={e => setCity(e.target.value)} />
                        </div>
                        <div className='label-input'>
                            <label htmlFor='country'>Country: </label>
                            <input type='text' id='country' onInput={e => setCountry(e.target.value)} />
                        </div>
                        <div className='button-group'>
                            <button disabled={!city && !country} className='button' type="button" onClick={() => searchWeather(city, country)}>Search</button>
                            <button className='button' type='reset' onClick={() => resetStateToDefault()}>Clear</button>
                        </div>
                    </div>
                </form>
                { showToggle === false ? null :
                    <WeatherInfo weather={data} error={error}/>
                }                  
                <SearchHistory weatherHistories={weatherHistories} searchWeather={searchWeather} deleteWeather={deleteWeather} clearAllHistory={clearAllHistory} />
            </div>
        </div>
    )
}
