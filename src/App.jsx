import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios"
import WaetherCard from './Components/WaetherCard';
import Loanding from './Components/Loanding';

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  

useEffect(() => {

  const success = pos => {
    const obj = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude
  }

  setCoords(obj);
}

  navigator.geolocation.getCurrentPosition(success)
}, [])
  


useEffect(() => {
  if(coords) {
  const APIKEY = `59921735845e339a7fb83da5893d1cc6`
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
  axios.get(URL)
    .then(res => {
    const celsius = (res.data.main.temp - 273.15).toFixed(1)
    const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
    setTemperature({celsius, farenheit})
    setWeather(res.data)
  })
    .catch(err => console.log(err))
}


}, [coords])
  
console.log(weather)
  return (
    <div className="App">
      {
        weather ?
      <WaetherCard weather={weather} temperature={temperature}/>
      :
      <Loanding />
      }
    </div>
  )
}

export default App
