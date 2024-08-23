const axios = require("axios");

const getWeather = async (lat, lng, days, key) => {
    if(days < 0){
        const errorMsg={
            message : "Date cannot be in the past",
            error : true
        }
        return errorMsg;
    }
    let weather_data={};
    if(days >= 0 && days <= 7){    
    const { data } = await axios.get(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${key}`)
    const {weather, temp} = data.data[0];
    const {description} = weather;
    weather_data = {description, temp};
    }else if(days > 7){
        const { data } = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${days}&key=${key}`)
        const {weather, temp, app_max_temp, app_min_temp} = data.data[data.data.length - 1];
        const {description} = weather;
        weather_data = {description, temp, app_max_temp, app_min_temp};
    }
    return weather_data;
}

module.exports = {getWeather};