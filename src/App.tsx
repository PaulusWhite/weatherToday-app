import { useState, useMemo, useEffect } from "react";

//API
import getWeatherForecast from "./API";

//Interfaces
import { ForecastI, DailyForecastI, ForecastResponseI } from "./interfaces";

//plugins
import changeBackground from "./plugins/changeBackground";

//Components
import Search from "./components/Search";
import CurrentForecast from "./components/CurrentForecast";
import SuggestedCity from "./components/SuggestedCity";
import WeatherDetails from "./components/WeatherDetails";
import AstroDetails from "./components/AstroDetails";
import HourlyForecast from "./components/HourlyForecast";
import Error from "./components/Error";
import Preloader from "./components/Preloader";

function App() {
  let [forecastData, setForecastData] = useState<ForecastI | null | undefined>(null);
  let [errorCode, setErrorCode] = useState<number | null>(null);
  let [isLoading, setIsLoading] = useState(false);
  let forecastNow = forecastData?.todayForecast as DailyForecastI;
  let [currentForecast, setCurrentForecast] = useState<DailyForecastI>(forecastNow);

  let code = currentForecast ? currentForecast.condition.code : 0; //weather code
  let isForecastRightNow: boolean = (currentForecast && currentForecast.localtime) ? true : false;

  let dailyForecast = forecastData?.dailyForecast as DailyForecastI[];
  let suggestions = ["Washington", "Toronto", "Paris", "Berlin", "London", "Kiev", "Tokyo"];

  let getForecast = async (value: string) => {
    setIsLoading(true);
    let forecast: ForecastResponseI = await getWeatherForecast(value);
    let status = forecast.status;
    if(status === 200){
      setForecastData(forecast.data);
      setCurrentForecast(forecast.data?.todayForecast as DailyForecastI);
      setErrorCode(null);
    }else{
      let errorCode: number = forecast.error.response.data.error.code;
      setErrorCode(errorCode);
      setForecastData(null);
    };
    setIsLoading(false);
  }

  let suggestionsArr = useMemo( () => {
    let suggestionsArr = suggestions.map( (cityValue, index) => (
      <SuggestedCity key={index+cityValue} {...{getForecast, cityValue}}/>
    ));
    return suggestionsArr;
  }, []);

  let dailyForecastArr = dailyForecast && dailyForecast.map( (day, index) => (
    <p key={index+day.cityName}
       onClick={() => setCurrentForecast(day)}
       className={day.date === currentForecast.date ? "active" : undefined}>{day.date}</p>
  ));

  useEffect( () => {
    let app = document.querySelector(".App") as HTMLDivElement;
    app.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  })

  useEffect( () => {
    changeBackground(code);
  }, [code]);

  return (
    <div className="App">
      <div className="background"></div>
      {isLoading && <Preloader />}
      <div className="resultPanel">
        <h1>WeatherToday</h1>
        <div className="mobileSearch">
          <Search {...{getForecast}}/>
        </div>
        {errorCode && <Error errorCode={errorCode}/>}
        {forecastData &&
          <>
            <CurrentForecast {...currentForecast}/>
            <HourlyForecast hourlyForecastData={currentForecast.hourlyForecast}
                            isForecastRightNow={isForecastRightNow}
                            localtime={currentForecast.localtime}/>
          </>
        }
      </div>
      <div className="workPanel">
        <Search {...{getForecast}}/>
        <div className="workPanel__suggestions">
          {suggestionsArr}
        </div>
        {forecastData && 
          <>
            <div className="workPanel__days">
              <p>Weather forecast for three days in {currentForecast.cityName}</p>
              <p className={`workPanel__forecastNow ${currentForecast.localtime && 'active'}`} 
                 onClick={() => setCurrentForecast(forecastNow)}>
                Right now
              </p>
              <div className="workPanel__allDays">
                {dailyForecastArr}
              </div>
            </div>
            <div className="workPanel__details">
              <p>Weather details on {currentForecast.date || currentForecast.localtime}</p>
              <div className="workPanel__detailsList">
                <WeatherDetails {...currentForecast.details}/>
              </div>
            </div>
            <div className="workPanel__astroDetails">
              <p>Astronomy details on {currentForecast.date || currentForecast.localtime}</p>
              <div className="workPanel__astroDetailsList">
                <AstroDetails {...currentForecast.astro}/>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
