import React, { useState } from 'react';
import WeatherInfo from '../components/WeatherInfo';
import SearchHistory from '../components/SearchHistory';
import axios from 'axios';

//import css files
import '../styles/pages/weather.css';
import '../styles/responsive/weather.css';

export default function Weather() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [data, setData] = useState({});
    const [weatherHistories, setWeatherHistories] = useState(JSON.parse(localStorage.getItem('weatherHistories')) || []);
    const [error, setError] = useState(false);
    const [showToggle, setShowToggle] = useState(false);

    const KEY = 'c8e63570cfd1d95c0766796a0a4ca6cc'; //API KEY
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'; //API base URL
    let httpParams;

    //set city and country state to empty string to clear the input field value
    const resetStateToDefault = () => {
        setCity('');
        setCountry('');
    }

    const searchWeather = async(city, country) => {
        /* 
            three conditions is used to make sure that the params required by the API is fullfilled. 
            If either one data is pass(city or country) while using the URL with comma, API will return
            "City Not Found"
        */
        if(city === "") httpParams = {q : country, APPID : KEY}
        else if(country === "") httpParams = {q : city, APPID : KEY}
        else httpParams = {q : city + "," + country, APPID : KEY}

        let searchParams = new URLSearchParams(httpParams);

        /*
            Axios was use for API handling, and in this case response received is save in the localStorage 
            for the data persistent and it is much realistic than handling it with state. 
        */
        try {
            const result = await axios.get(BASE_URL + searchParams.toString());
            let responseData = result.data

            /* 
                convert and add a key object value(current_time) to the object received, for the time to be use later in the search weather history.
                Data is manage before passing it to the UI.
            */
            responseData.current_time = new Date().toLocaleTimeString()
            const newHistories = [...weatherHistories]; //clone weatherHistories state to new array for alteration 
            newHistories.unshift(responseData); //change the array order in decending order (latest at the top)
            setWeatherHistories(newHistories);
            localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
            setData(responseData);
            setError(false);
            setShowToggle(true);
        } catch(err) {
            //error handling, if response return is 404, error is set to true to render the "Not Found" message to user.
            if(err.response.status === 404) {
                setError(true); 
                setShowToggle(true)
            }
        }        
    }

    //function to delete single weather from search history
    const deleteWeather = (i) => {
        const newHistories = [...weatherHistories]; //clone to a new array before alter the original state.
        newHistories.splice(i, 1); //localStorage.removeItem cannot be use here because it will remove entire key       
        localStorage.setItem('weatherHistories', JSON.stringify(newHistories)); //for persistent data 
        setWeatherHistories(newHistories);

        (Array.isArray(newHistories) && newHistories.length) ? setShowToggle(true) : setShowToggle(false); 
    }

    //extra function to clear all the search history.
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
                            {/* button is set to disabled when both the city and country input is empty */}
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
