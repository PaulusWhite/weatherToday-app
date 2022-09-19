import axios from "axios";

//interfaces
import { DailyForecastI, AstroDetailsI, HourlyForecastI } from "./interfaces";

//Plugins
import convertDate from "./utils/convertDate";

let getDailyForecast = (forecastday: any, location: any) => {
    let {name, region, country} = location;
    let dailyForecast: DailyForecastI[] = forecastday.map( (dayData: any) => {

        let hourlyForecast: HourlyForecastI[] = dayData.hour.map((data: any) => (
            {
                rain: data.chance_of_rain,
                snow: data.chance_of_snow,
                condition: {
                    imgLink: data.condition.icon,
                    description: data.condition.text,
                    code: data.condition.code,
                },
                cloud: data.cloud,
                humidity: data.humidity,
                precipitation: data.precip_mm,
                temperature: data.temp_c,
                time: data.time,
                windDirection: data.wind_dir,
                wind: data.wind_kph,
            }
        ));

        let date = convertDate(dayData.date);
        let dayForecast: DailyForecastI = {
            cityName: name,
            region,
            country,
            date,
            temperature: (+dayData.day.maxtemp_c - 2).toString(),
            condition: {
                imgLink: dayData.day.condition.icon,
                description: dayData.day.condition.text,
                code: dayData.day.condition.code,
            },
            details: {
                humidity: dayData.day.avghumidity,
                wind: dayData.day.maxwind_kph,
                precipitation: dayData.day.totalprecip_mm,
                rain: dayData.day.daily_chance_of_rain,
                snow: dayData.day.daily_chance_of_snow,
            },
            astro: {
                moonIllumination: dayData.astro.moon_illumination,
                moonPhase: dayData.astro.moon_phase,
                moonrise: dayData.astro.moonrise,
                moonset: dayData.astro.moonset,
                sunrise: dayData.astro.sunrise,
                sunset: dayData.astro.sunset,
            },
            hourlyForecast,
        }
        return dayForecast;
    });

    return dailyForecast;
}

let getNowForecast = (response: any, location: any, astro: AstroDetailsI, hourlyForecast: HourlyForecastI[]) => {
    let current = response.data.current;
    let {name, region, country, localtime} = location;
    localtime = convertDate(localtime)

    return {
        cityName: name,
        region,
        country,
        localtime,
        temperature: current.temp_c,
        details: {
            wind: current.wind_kph,
            humidity: current.humidity, 
            precipitation: current.precip_mm,
        },
        condition: {
            description: current.condition.text,
            imgLink: current.condition.icon,
            code: current.condition.code,
        },
        astro,
        hourlyForecast,
    }
}

//Api for getting forecast
let getWeatherForecast = async (location: string) => {
    let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {q: location, days: '3'},
        headers: {
          'X-RapidAPI-Key': '8012bd5a3amsh1191195c3b8dbf4p1ef8ffjsn75cd7de35e4a',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try{
        let response = await axios.request(options);
        let forecastday = response.data.forecast.forecastday;
        let location = response.data.location;

        let dailyForecast: DailyForecastI[] = getDailyForecast(forecastday, location);
        let todayForecast: DailyForecastI = getNowForecast(response, location, dailyForecast[0].astro, dailyForecast[0].hourlyForecast);

        return { status: 200, data: { todayForecast, dailyForecast }};
    }catch(error){
        return {status: 400, error };
    }
}

export default getWeatherForecast;