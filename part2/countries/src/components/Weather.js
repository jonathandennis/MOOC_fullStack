//////////////////////////////////////////////////
//////   2.14 Data for countries, step3
//////////////////////////////////////////////////


import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({ capital }) => {
    const [ curWeather, setCurWeather] = useState(null)
    console.log('capital in Weather:', capital)
    console.log('curWeather in Weather:', curWeather)

    useEffect(() => {
        console.log('capital in useEffect:', capital)
        const params = {
          access_key: process.env.REACT_APP_API_KEY,
          query: capital
        }
        axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
          setCurWeather(response.data)
          console.log('response.data from useEffect', response.data)
        })
    }, [capital])

    if (!curWeather) {
    return (
        <div>Loading weather.... please wait</div>
    )}
    
    return (
        <div>
            <h2>Weather in {curWeather.location.name}</h2>
            <p><strong>temperature:</strong> {curWeather.current.temperature} Celcius</p>
            <img height="75" src={curWeather.current.weather_icons} alt={curWeather.location.name}/>
            <p><strong>wind:</strong> {curWeather.current.wind_speed} kph direction {curWeather.current.wind_dir}</p>
        </div>

    )
}
export default Weather

