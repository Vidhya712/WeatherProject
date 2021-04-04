//jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");


//using
app.use(bodyParser.urlencoded({
  extended: true
}));


// getting
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


// posting
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "52f0a92178913d9b0178b29d01e8a9b7";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    //data search
    response.on("data", function(data) {
      //console.log(data);  // prints weather data in hexadecimal format inside hyper

      // parsing
      const weatherData = JSON.parse(data); // // prints weather data in Javascript format inside hyper
      console.log(weatherData);

      // to display or print specific weather data inside hyper
      const temp = weatherData.main.temp;
      console.log(temp);

      const description = weatherData.weather[0].description;
      console.log(description);


      // const weatherIcon = weatherData.weather[0].icon;
      const weatherIconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      //sending
      // to display data in website
      res.write("<h1> The Temparature in " + req.body.cityName + " is " + temp + " Degree Celcius. </h1>");
      // or use multiple res.write and call res.send(); to print multiple infos as bellow.
      res.write("The Current Weather is " + description + ". <br/>");

      res.write("<img src=" + weatherIconURL + ">");
      res.send();
    });
  });
});


//listening
app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
