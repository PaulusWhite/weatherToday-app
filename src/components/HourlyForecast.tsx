import { useState, useEffect } from "react";

//interfaces
import { HourlyForecastI, HourlyForecastPropsI } from "../interfaces";

//Plugins
import convertDate from "../utils/convertDate";

const HourlyForecast = (props: HourlyForecastPropsI) => {
  let data = props.hourlyForecastData;
  let isForecastRightNow = props.isForecastRightNow;
  let localtime = props.localtime;
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
    let hourlyForecastTable = document.querySelector(".hourlyForecast__table") as HTMLDivElement;
    hourlyForecastTable.scrollLeft = 0;

    if(isForecastRightNow){
      let localHour = localtime?.split(" ")[3].split(":")[0] as string;
      setHourData(data[+localHour]);
      setTimeout( () => {
        let activeHour = document.querySelector(".hourlyForecast__table .active") as HTMLDivElement;
        let activeHourDistance: number = activeHour.getBoundingClientRect().left;
        let hourlyForecastTableDistance: number = hourlyForecastTable.getBoundingClientRect().left;
        hourlyForecastTable.scrollLeft = activeHourDistance - hourlyForecastTableDistance;
      }, 100);
      return;
    }

    setHourData(data[0]);
  }, [data, isForecastRightNow]);
    
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