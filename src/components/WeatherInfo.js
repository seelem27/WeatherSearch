import React, { useMemo } from 'react';
import '../styles/components/weatherInfo.css';

export default function WeatherInfo(props) {
    let data = props.weather; //data get from parent through props.

    /* 
        useMemo is use here to cache the value and allow component to grab value from the cache 
        without re-run this function everytime the page re-render (react nature). This function
        will only run when data.dt changes.
    */
    const memorisedDateTimeJSX = useMemo(() => {
        let epochDateTime = new Date(data.dt * 1000);
        return epochDateTime.toLocaleString('en-CA')    
    }, [data.dt])  

    return (
        <div className='weather-info'>
            { (props.error) ? 
                <div className='not-found'><p>Not found</p></div> :
                <div className='weather-content'>                
                    { (data.sys || data.weather || data.main || data.dt) ?                        
                        <div>
                            <p className='weather-label'>{`${data.name}, ${data.sys.country}`}</p>
                            <p className='weather-title'>{data.weather[0].main}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='weather-label'>Description: </td>
                                        <td className='weather-detail'>{ data.weather[0].description }</td>
                                    </tr>
                                    <tr>
                                        {/* temperature is in fahrenheit format */}
                                        <td className='weather-label'>Temperature: </td>
                                        <td className='weather-detail'>{`${data.main.temp_min}°F ~ ${data.main.temp_max}°F`}</td>
                                    </tr>
                                    <tr>
                                        <td className='weather-label'>Humidity: </td>
                                        <td className='weather-detail'>{ `${data.main.humidity}%` }</td>
                                    </tr>
                                    <tr>
                                        {/* Time displayed is the time return from the API */}
                                        <td className='weather-label'>Time: </td>
                                        <td className='weather-detail'>{ memorisedDateTimeJSX }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> : null
                    }                 
                </div>
            }            
        </div>
    )
}
