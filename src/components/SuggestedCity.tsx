//Interfaces
import { SearchI } from "../interfaces";

const SuggestedCity = (props: SearchI) => {
  let cityValue = props.cityValue;
  return (
    <p className="suggestedCity" onClick={() => props.getForecast(cityValue)}>{cityValue}</p>
  )
}

export default SuggestedCity;