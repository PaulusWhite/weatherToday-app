//img
import cloudy from "../assets/background/dayCloudy.webp";
import sunny from "../assets/background/sunny.webp";
import overcast from "../assets/background/overcast.webp";
import mist from "../assets/background/mist.webp";
import rainy from "../assets/background/rainy.webp";
import snowy from "../assets/background/snowy.webp";
import thundery from "../assets/background/thundery.webp";
import other from "../assets/background/other.webp";

let changeBackground = (code: number) => {
    let app = document.querySelector(".App") as HTMLDivElement;
    let img;
    if(code === 0 || code === 1003 || code === 1006){
        img = cloudy
    }else if(code === 1000){
        img = sunny;
    }else if(code === 1009){
        img = overcast;
    }else if(code === 1030){
        img = mist;
    }else if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 
                || code === 1192 || code === 1195 || code === 1198 || code === 1201
                || code === 1240 || code === 1243 || code === 1246 || code === 1273 
                || code === 1072 || code === 1150 || code === 1153
                || code === 1168 || code === 1171){
        img = rainy;
    }else if(code === 1066 || code === 1114 || code === 1210 || code === 1213 || code === 1216 
                || code === 1219 || code === 1222 || code === 1225 || code === 1255 
                || code === 1258 || code === 1279 || code === 1282 || code === 1069
                || code === 1204 || code === 1207 || code === 1249 || code === 1252
                ){
        img = snowy;
    }else if(code === 1087 || code === 1276){
        img = thundery;
    }else{
        img = other;
    };
    app.style.backgroundImage = `url(${img})`;
}

export default changeBackground;