import { useState } from "react";

//Interfaces
import { SearchI } from "../interfaces";

//icons
import { BiSearch } from "react-icons/bi";

const Search = (props: SearchI) => {
  let [value, setValue] = useState("");

  let handleSetValue = (value: string) => {
    if(/[0-9!,.\/\\@*()?|"=+><_;:~%$№#&[\]]/.test(value)) return;
    if(value[0] === " ") return;
    setValue(value);
  }

  let handleClick = () => {
    if(!value) return;
    props.getForecast(value);
    setValue("");
  }

  let enterClick = (code: number) => {
    if(!value) return;

    if(code === 13){
      props.getForecast(value);
      setValue("");
    }
  }

  return (
    <div className="search">
        <input type="text"
               placeholder="Search location..."
               value={value}
               onChange={(event) => handleSetValue(event.target.value)}
               onKeyDown={(event) => enterClick(event.keyCode)}
        />
        <button className="search__btn" onClick={handleClick}>
            <BiSearch />
        </button>
    </div>
  )
}

export default Search;