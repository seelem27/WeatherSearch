import React, { useState, useEffect, useMemo } from 'react';
import './css/searchHistory.css';

export default function SearchHistory(props) {
    //const weatherHistoryLists = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    // const deleteRecord = id => ({

        
    // });
    const weatherHistoryLists = props.weatherHistories;

    const clearAllHistory = () => {
        localStorage.removeItem('weatherHistories');
    }

    const memorisedHistoriesJSX = useMemo(() => (
        weatherHistoryLists.map((weatherHistory, i) => (
            <li key={i}>
                <div className='weather-list'>
                    <div>
                        <span>{weatherHistory.sys ? `${weatherHistory.name}, ${weatherHistory.sys.country}` : null}</span>
                    </div>
                    <div>
                        <span>03:15:02 PM</span>
                        <button className='button-list' onClick={() => props.searchWeather(weatherHistory.name, weatherHistory.sys.country)}>Search</button>
                        <button onClick={() => props.deleteWeather(i)}>delete</button>
                    </div>
                </div>
                <hr />                       
            </li>
        )
    )), [weatherHistoryLists])

    return (
        <div className='search-history'>
            <div>
                <div className='search-history-header'>
                    <p className='title'>Search History</p>
                    <button onClick={props.clearAllHistory}>Clear History</button>
                </div>
                <hr />
            </div>
            { (weatherHistoryLists.length > 0) ?
                <div>
                    <ol>
                        {memorisedHistoriesJSX}
                    </ol>
                </div>
            :   <p>No Records</p> 
            }
        </div>
    )
}
