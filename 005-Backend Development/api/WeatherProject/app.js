const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
//When the user submits the form (in index.html), the cityName field is sent to the server as part of the POST request.
app.post("/", function(req, res) {
    //Building the API Request
    const query = req.body.cityName;
    const apiKey = "17bfc9a8e13796f5eb3fff46ede4db9e";
    const unit = "metric";
    //The url combines the user input, API key, and other parameters into a full API request.
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    // Sends the request to OpenWeatherMap’s API and waits for a response.
    https.get(url, function(response) {
        // The API sends the data in chunks. This callback processes the data as it arrives.
        response.on('data', (d) => {
            // JSON.stringify is the opposite of JSON.parse
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // res.write() doesnt display html without this line
            res.set("Content-Type", "text/html");
            res.write("<p>" + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src='" + imageURL + "'>");
            res.end();
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})