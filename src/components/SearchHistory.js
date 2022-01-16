import React, { useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri'
import '../styles/components/searchHistory.css';

export default function SearchHistory(props) {
    const weatherHistoryLists = props.weatherHistories;  

    const memorisedHistoriesJSX = useMemo(() => (
        weatherHistoryLists.map((weatherHistory, i) => (
            <li key={i}>
                <div className='weather-list'>
                    <div className='left-group'>
                        <span>{weatherHistory.sys ? `${weatherHistory.name}, ${weatherHistory.sys.country}` : null}</span>
                    </div>
                    <div className='right-group'>
                        <span>{ weatherHistory.current_time }</span>
                        <button className='button-gap action-button' onClick={() => props.searchWeather(weatherHistory.name, weatherHistory.sys.country)}><FaSearch className='button-icon' /></button>
                        <button className='action-button' onClick={() => props.deleteWeather(i)}><RiDeleteBin6Line className='button-icon' /></button>
                    </div>
                </div>
                <hr />                       
            </li>
        )
    )), [weatherHistoryLists])

    return (
        <div className='search-history'>
            <div className='search-history-header'>
                <p className='title'>Search History</p>
                { (weatherHistoryLists.length > 0) ?
                    <button onClick={props.clearAllHistory}>Clear History</button> : null
                }
            </div>
            <hr />
            { (weatherHistoryLists.length > 0) ?
                <div className='search-history-lists'>
                    <ol>
                        {memorisedHistoriesJSX}
                    </ol>
                </div>
                : <p className='no-records-text'>No Records</p> 
            }
        </div>
    )
}