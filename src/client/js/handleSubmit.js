import axios from "axios";
import {calculateRemainingDays} from "./calculateRemainingDays";

const form = document.getElementById("travelForm");
const dateInp = document.getElementById("date");
const city = document.getElementById("city");
const city_error = document.getElementById("city_error");
const date_error = document.getElementById("date_error");
// hide the details section
document.querySelector("#details").desplay = "none"; 
const handleSubmit = async (e) => {
    e.preventDefault();
    // validate the city input
    if(!validate_input()){
        return;
    }
     // get location information
    const location = await getCity();
    // handle city name error
    if(location.error){
        city_error.innerHTML = `${location.message}`;
        city_error.style.display = "block";
        return;
    }
    city_error.style.display = "none";
    const {lng, lat, city} = location;
    //Calculate remaining days for travel
    const date = dateInp.value
    const remainingDays = calculateRemainingDays(date);
    // get weather information
    const weather = await getWeather(lng, lat, remainingDays);
    // handle weather error
    if(weather.error){
        date_error.innerHTML = `${weather.message}`;
        date_error.style.display = "block";
        return;
    }
    date_error.style.display = "none";
    // get city picture
    const getCityPic = await getCityPicture(city);
    // update the UI
    updateUI(remainingDays, city, weather, getCityPic);
}
// post data to the server from the form
const getCity = async () => {
    const {data} = await axios.post("http://localhost:8000/getCity", form,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data; 
}
// get weather information
const getWeather = async (lng, lat, remainingDays) => {
    const {data} = await axios.post("http://localhost:8000/getWeather",{
        lng,
        lat, 
        remainingDays,
    });
    return data;
}
// get city picture
const getCityPicture = async (city) => {
    const {data} = await axios.post("http://localhost:8000/getCityPic",{
        city,
    });
    return data;
}
// Update UI by remainingDays, city, weather, getCityPic
const updateUI = (remainingDays, city, weather, getCityPic) => {
    // update the remainingDays
    document.getElementById("days").innerHTML = `Remaining Days: ${remainingDays}`;
    // update the city name
    document.querySelector(".cityName").innerHTML = `Location: ${city}`;
    // update the weather
    document.querySelector(".weather").innerHTML = 
    remainingDays < 7
    ? `Weather is: ${weather.description}`
    : `Weather is expected to be: ${weather.description}`;
    // update the temp
    document.querySelector(".temp").innerHTML = 
    remainingDays > 7
    ? `Forecast: ${weather.temp} degC`
    : `Tempreature: ${weather.temp} degC`;
    // update the max and min temp
    document.querySelector(".max-temp").innerHTML = 
    remainingDays > 7
    ? `Max: ${weather.app_max_temp} degC`
    : "";
    document.querySelector(".min-temp").innerHTML = 
    remainingDays > 7
    ? `Min: ${weather.app_min_temp} degC`
    : "";
    // update the city picture
    document.querySelector(".cityPic").innerHTML = 
    `<img src="${getCityPic.image}" alt="an image that describes the ${city} nature">`;
    document.querySelector("#details").desplay = "block";
}
// validate the form input
const validate_input =() =>{
    date_error.style.display = "none";
    city_error.style.display = "none";
    if(!city.value){
        city_error.style.display = "block";
        city_error.innerHTML = 'You need to enter a city'
        return false;
    }
    if(!dateInp.value){
        date_error.style.display = "block";
        date_error.innerHTML = 'Please enter a valid date';
        return false;
    }
    if(calculateRemainingDays(dateInp.value) < 0){
        date_error.style.display = "block";
        date_error.innerHTML = 'Date should be in the future';
        return false;
    }
    return true;
}

export { handleSubmit }