//interfaces
import { DailyForecastI } from "../interfaces";

const CurrentForecast = (props: DailyForecastI) => {
  let temperature: number = +parseFloat(props.temperature).toFixed(1);
  return (
    <div className="currentForecast">
      <div className="currentForecast__temperature">
        <p>{temperature}°C</p>
      </div>
      <div className="currentForecast__info">
        <div className="currentForecast__data">
          <p className="currentForecast__location">{props.cityName}, {props.country}</p>
          <p className="currentForecast__time">{props.localtime || props.date}</p>
        </div>
        <div className="currentForecast__description">
          <img src={props.condition.imgLink} alt="weatherIcon"/>
          <p>{props.condition.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentForecast;