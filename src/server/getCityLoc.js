const axios = require("axios");

const getCityLocation = async(city, username) => {
    const {data} = await axios.get(`http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=1&username=${username}`)
    if(data.postalCodes.length === 0){
        const errorMsg={
            message : "No city with that name. Please macke sure of your spelling.",
            error : true
        }
        return errorMsg;
    }
    const {placeName, lat, lng} = data.postalCodes[0];
    return {lat: lat, lng: lng, city: placeName}
}

module.exports = {getCityLocation}