const axios = require("axios");
// https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo
const getPicture = async(city, key) => {
    const {data} = await axios.get(`https://pixabay.com/api/?key=45549307-63fd2d5b317a3f0b225e2710a&q=${city}&image_type=photo`) 
    const image = await data.hits[0]? await data.hits[0].webformatURL: "https://source.unsplash.com/random/640x480?city,morning,night?sig=1"
    return {image};
}
module.exports = {getPicture}