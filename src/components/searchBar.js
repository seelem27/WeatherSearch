import React from 'react';
import './css/searchBar.css';

export default function searchBar() {
    return (
        <form>
            <div className='searchBar-container'>
                <div className='label-input'>
                    <label htmlFor='city'>City: </label>
                    <input type='text' id='city'></input>
                </div>
                <div className='label-input'>
                    <label htmlFor='country'>Country: </label>
                    <input type='text' id='country'></input>
                </div>
                <button className='button'>Search</button>
                <button className='button' type='reset'>Clear</button>
            </div>                   
        </form>
    )
}
