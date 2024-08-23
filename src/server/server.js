var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Importing functions from other files
const {getCityLocation} = require('./getCityLoc');
const {getWeather} = require('./getWeather');
const {getPicture} = require('./getPicture');
//create dotnev
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

app.use(express.static('dist'));
app.use(express.json());
////////////////////////////////
// Variables for api key
// API key for GeoNames
const username = process.env.USERNAME_KEY;
// API key for weather
const weatherKey = process.env.WEATHER_KEY;
// API key for PICTURE
const pictureKey = process.env.PICTURE_KEY;
////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
//* POST Route for GeoNames
app.post('/getCity',  async (req, res) => {
    const {city} = req.body;
    const location = await getCityLocation(city, username);
    //sernd data to the client
    res.send(location);
});
//* Post Route for Weather
app.post('/getWeather',  async (req, res) => {
    const {lat, lng, remainingDays} = req.body;
    const weather = await getWeather(lat, lng, remainingDays, weatherKey);
    //send data to the client
    res.send(weather);
});
//* Post Route for City Picture
app.post('/getCityPic',  async (req, res) => {
    const { city } = req.body;
    const picture = await getPicture(city, pictureKey);
    //send data to the client
    res.send(picture);
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


