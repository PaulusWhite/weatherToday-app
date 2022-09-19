//interfaces
import { WeatherDetailsI } from "../interfaces";

const WeatherDetails = (props: WeatherDetailsI ) => {
  let isForecastRightNow = Boolean("rain" in props); //Forecast for now doesn't has key rain
  
  //Details for now
  if(!isForecastRightNow) return (
    <>
      <p>Humidity: {props.humidity}%</p>
      <p>Wind: {props.wind} km/h</p>
      <p>Precipitation: {props.precipitation} mm</p>
    </>
  )

  //else details for all day
  return (
    <>
      <p>Average humidity: {props.humidity}%</p>
      <p>Max wind: {props.wind} km/h</p>
      <p>Precipitation: {props.precipitation} mm</p>
      <p>Chance of rain: {props.rain}%</p>
      <p>Chance of snow: {props.snow}%</p>
    </>
  )
}

export default WeatherDetails;