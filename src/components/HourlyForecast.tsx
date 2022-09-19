import { useState, useEffect } from "react";

//interfaces
import { HourlyForecastI } from "../interfaces";

//Plugins
import convertDate from "../utils/convertDate";

const HourlyForecast = (props: {hourlyForecastData: HourlyForecastI[]}) => {
  let data = props.hourlyForecastData;
  let [hourData, setHourData] = useState<HourlyForecastI>(data[0]);

  let hourlyForecastArr = data.map( (hour: HourlyForecastI, index) => {
    let time = hour.time.split(" ")[1];
    return (
      <div key={index + hour.time} 
           className={`hourlyForecast__hour ${hour.time === hourData.time && "active"}`}
           onClick={() => hour.time !== hourData.time && setHourData({...hour, time: hour.time})}>
        <p>{time}</p>
        <p>{hour.temperature}°C</p>
        <img src={hour.condition.imgLink} alt="weatherIcon"/>
      </div>
    )
  });

  useEffect( () => {
    setHourData(data[0]);
  }, [data]);
    
  return (
    <div className="hourlyForecast">
      <div className="hourlyForecast__hourData">
        <p className="hourlyForecast__sign">{convertDate(hourData.time, true)}</p>
        <div className="hourlyForecast__details">
          <div>
            <p>Temperature: {hourData.temperature}°C</p>
            <p>Humidity: {hourData.humidity}%</p>
            <p>Wind: {hourData.wind} km/h</p>
            <p>Wind direction: {hourData.windDirection}</p>
          </div>
          <div>
            <p>Cloudy: {hourData.cloud}%</p>
            <p>Rain chance: {hourData.rain}%</p>
            <p>Snow chance: {hourData.snow}%</p>
            <p>Precipitation: {hourData.precipitation} mm</p>
          </div>
          <div className="hourlyForecast__hourIcon">
            <img src={hourData.condition.imgLink} alt="weatherIcon"/>
            <p>{hourData.condition.description}</p>
          </div>
        </div>
      </div>
      <div className="hourlyForecast__table">
        {hourlyForecastArr}
      </div>
    </div>
  )
}

export default HourlyForecast;