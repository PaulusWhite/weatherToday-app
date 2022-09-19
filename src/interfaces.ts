interface WeatherDetailsI {
    humidity: string,
    wind: string,
    precipitation: string,
    rain?: string,
    snow?: string,    
}

interface AstroDetailsI {
    moonIllumination: string,
    moonPhase: string,
    moonrise: string,
    moonset: string,
    sunrise: string,
    sunset: string,    
}

interface HourlyForecastI {
    rain: string,
    snow: string,
    cloud: string,
    humidity: string,
    precipitation: string,
    temperature: string,
    time: string,
    windDirection: string,
    wind: string,
    condition: {
        imgLink: string,
        description: string,
        code: number,
    }
}

interface DailyForecastI {
    cityName: string,
    region: string,
    country: string,
    localtime?: string, 
    date?: string,
    temperature: string,
    details: WeatherDetailsI,
    condition:{
        imgLink: string,
        description: string,
        code: number,
    }
    astro: AstroDetailsI,
    hourlyForecast: HourlyForecastI[],
}

interface ForecastI {
    todayForecast: DailyForecastI,
    dailyForecast: DailyForecastI[],
}

interface SearchI {
    cityValue?: string,
    getForecast: any,
}

interface ForecastResponseI {
    status: number,
    error?: any,
    data?:ForecastI,
}

export { 
    WeatherDetailsI,
    AstroDetailsI,
    HourlyForecastI,
    DailyForecastI, 
    ForecastI, 
    SearchI,
    ForecastResponseI,
 }