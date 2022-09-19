//interfaces
import { AstroDetailsI } from "../interfaces";

const AstroDetails = (props: AstroDetailsI) => {
  return (
    <>
        <p>Moon illumination: {props.moonIllumination}%</p>
        <p>Moon phase: {props.moonPhase}</p>
        <p>Moonrise: {props.moonrise}</p>
        <p>Moonset: {props.moonset}</p>
        <p>Sunrise: {props.sunrise}</p>
        <p>Sunset: {props.sunset}</p>
    </>
  )
}

export default AstroDetails;