let temperatureField = document.querySelector(".temp");
let cityField = document.querySelector(".time_location p");
let dateFiled = document.querySelector(".time_location span");
let searchField = document.querySelector(".searchField");
let emojiFiled = document.querySelector(".weather_condition img");
let weatherFiled = document.querySelector(".weather_condition span");
const searchBtn = document.querySelector(".search");
let pm1 =document.querySelector(".pm2");
let pm2= document.querySelector(".pm10");



let target = "Delhi";
let dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


searchBtn.addEventListener("click", function (e) {
 
    e.preventDefault();
    target = searchField.value;
    
    fetchData(target);
})

searchField.addEventListener('keydown',(e)=>{
    if(e.key ==='Enter'){
        target = searchField.value;
        fetchData(target);
    }

})

async function fetchData(target) {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=7e19e3b77f8c48e4804124302231709&q=${target}&aqi=yes`;
        let response = await fetch(url);
        //console.log(response);
        let data = await response.json();
        //console.log(data);
        let currentTemp = data.current.temp_c;
        let currentCondition = data.current.condition.text;
        let locationName = data.location.name
        let localTime = data.location.localtime
        let conditionEmoji = data.current.condition.icon
        let pm2_5 = data.current.air_quality.pm2_5;
        let pm10 = data.current.air_quality.pm10;
        //console.log(locationName, currentTemp, currentCondition, localTime, conditionEmoji,pm2_5,pm10);
       
        updateDOM(locationName, currentTemp, currentCondition, localTime, conditionEmoji,pm2_5,pm10);
    }
    catch (error) {
        alert("Please put a valid location");
        //console.log(error);
    }
}

function updateDOM(locationName, temp, condition, dateTime, conditionEmoji,pm2_5,pm10) {
    let arr = dateTime.split(" ");
    // console.log(arr);
    let date = arr[0];
    let time = arr[1];
    
    let dayNumber = new Date(date).getDay();
    //console.log(dayArr[dayNumber]);
    let dayName = dayArr[dayNumber];
    dateFiled.innerText = `${time} ${dayName} ${date}`;
    temperatureField.innerText = temp;
    cityField.innerText = locationName;
    emojiFiled.src = conditionEmoji;
    weatherFiled.innerText = condition;
    pm1.innerText=`PM 2.5  :  ${pm2_5}`;
    pm2.innerText= `PM 10  :  ${pm10}`;
    
}







