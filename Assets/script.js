$(document).ready(function () {

  // var for our search bbuttons
var city= $("#city").val();
var state= $("#state").val();
var date = $("#date").val();
// vars for the divs on page


function displayapi() {

    // .empty() our search so far

    city = $("#city").val();
    state= $("#state").val();
    date = $("#date").val();
    console.log(city);
    // var queryURL = "GET https://api.yelp.com/v3/Authorization=CRh4dVy8vCYb_8OeBP5ACVQmlTbrk6mZXHwi8VSv9jcOtYRHNHktPbFWZD6dqfqmv9zICcen2OEQx5aEI--lPD5BhlLYpblNxIBlGyJT2aNN1ZpmzytcLGCHOfW5XXYx/events/featured";
    //  + city + 
    // "&limit=12&apikey=l65DOVZqzCV7f9KvfiPdx8g4rfyHcN3A";
    // Client ID   HD-g370bl5p7d60lC6yXqQ

// API Key CRh4dVy8vCYb_8OeBP5ACVQmlTbrk6mZXHwi8VSv9jcOtYRHNHktPbFWZD6dqfqmv9zICcen2OEQx5aEI--lPD5BhlLYpblNxIBlGyJT2aNN1ZpmzytcLGCHOfW5XXYx
    // console.log(queryUrlYelp);
    // $.ajax({
    //   url: queryUrlYelp,
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response);


    // });// end of yelp api search


    // start of weather api 
    // var queryURL = "GET https://api.yelp.com/v3/Authorization=CRh4dVy8vCYb_8OeBP5ACVQmlTbrk6mZXHwi8VSv9jcOtYRHNHktPbFWZD6dqfqmv9zICcen2OEQx5aEI--lPD5BhlLYpblNxIBlGyJT2aNN1ZpmzytcLGCHOfW5XXYx/events/featured";

    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryUrlWeather = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + city + "," + state +"&units=imperial&appid=" + APIKey;

    // weather search for 5 days
  // var queryUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?q=+"+city+",us&mode=xml&appid=166a433c57516f51dfab1f7edaed8413";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryUrlWeather,
      method: "GET"
    })
      .then(function(response) {
        console.log(queryUrlWeather);
        console.log(response);

        // Transfer content to HTML
        $("#cityName").html("<h2>" + response.name + " Weather Details </h2>");
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      }); // end of weather api search


}; // end of api searches

// calling function to show api search
$(document).on("click", "#submit", displayapi); 





});