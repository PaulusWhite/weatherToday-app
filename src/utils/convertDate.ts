let convertDate = (dateValue: string, mark?: boolean): string => {
    let dateValueArr = dateValue.split(" ");
    let fullDateArr = dateValueArr[0].split("-");
    let currentDayValue = +fullDateArr[2];
    
    let date = new Date();
    date.setDate(currentDayValue);
    let dayIndex = date.getDay();
    let monthIndex = date.getMonth();

    let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let monthName = month[monthIndex];
    let dayName = weekday[dayIndex];

    let correctDate = `${fullDateArr[1]}-${fullDateArr[2]}, ${dayName}, ${monthName}`;
    let correctTime = dateValueArr[1] ? `, ${dateValueArr[1]} ${!mark ? `(now)` : ``}`: ""; 

    return correctDate + correctTime;
}

export default convertDate;