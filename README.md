# Capstone--Travel-App
## Capstone-Travel App with udacity project
A travel application has been created that obtains the location and date of the user’s desired trip, in addition to the weather condition on the specified date. If it is more than 7 days away, the expected weather condition
is given with its lowest and highest value, and displays an image of the location using the information obtained from programming interfaces. External applications.
3 APIs were used one for location (latitude and longitude) the second for weather and the third to get an image of the location
### notes: Node.js version is v20.10.0, npm version : 10.8.2
# API information:
#### USERNAME_KEY = nooraldeen
#### WEATHER_KEY = 73bf165e4f4747dc9f71014b3547b6ba
#### PICTURE_KEY = 45549307-63fd2d5b317a3f0b225e2710a
 
 to use the API you need to create a .env file and then use the above APIs and put them in .env file 
#
and then in the server/server.js file do like this:
##### // Variables for api key
##### // API key for GeoNames
const username = process.env.USERNAME_KEY;
##### // API key for weather
const weatherKey = process.env.WEATHER_KEY;
##### // API key for PICTURE
const pictureKey = process.env.PICTURE_KEY;


# Skills used:
## The main goal is to deal with APIs and how to fetch them. I used the axios library for this task
### I dealt with the concept of the document and getting elements from the DOM 
### And how to make access on the elements 
### Using getElementById or quereSelector methods
### Modifying the user interface using innerHTML 
### In addition to using callback functions and how do we use them appropriately
### and asynchronous Javascript function
### The user interface is designed using CSS and SASS

# From the server side:
### I built node js and used the Express library to build a server to deal with the client and API from the server side instead of the client side.
### In building the server, I used my knowledge of Webpack to organize the project files and compress them to reduce their size and increase its efficiency 
### I used service workers to run the project without the Internet, such as making a copy with the client 
### I created Unit Testing using Jest framework for some of the methods I used
### In the end, I uploaded the project to github and used git commands in cmd