$(document).ready(function () {

  // var for our search bbuttons
  var city = $("#city").val();
  var state = $("#state").val();
  var eventType = $("#eventType").val();
  // var date = $("#date").toUTCString();
  // var price = $("#price").val();
  // vars for the divs on page
  var price = "paid";


  function displayapi() {

    // .empty() our search so far

    city = $("#city").val();
    state = $("#state").val();
    eventType = $("#eventType").val();
    // price = $("#price").val();
    // date = $("#date").val();
      //start date example until i can convert users input of date into this format
    var  startDate = "2019-11-01T03%3A00%3A04Z"; 
    var  endDate = "2019-11-01T23%3A59%3A00Z";

    console.log(city);
    
    var apiKeyEventBright = "FNOM6HESUBQXNERX2XCC";

    // var queryUrlEventBright2 = "https://www.eventbriteapi.com/v3/events/search/?q=music&location.address=philadelphia&start_date.keyword=this_week&token=FNOM6HESUBQXNERX2XCC";

    var queryUrlEventBright2 = "https://www.eventbriteapi.com/v3/events/search/?q="+ eventType +"&location.address="+city+"&start_date.range_start="+date+"&token=FNOM6HESUBQXNERX2XCC";

    // var queryUrlEventBright3 = "https://www.eventbriteapi.com/v3/events/search/?q=music&sort_by=best&location.address=philadelphia&price=free&start_date.range_start=2019-11-01T03%3A00%3A04Z&start_date.range_end=2019-11-01T23%3A59%3A00Z&token=FNOM6HESUBQXNERX2XCC";
    var queryUrlEventBright3 = "https://www.eventbriteapi.com/v3/events/search/?q="+ eventType +"&sort_by=best&location.address="+city+"&price="+price+"&start_date.range_start="+ startDate +"&start_date.range_end="+ endDate +"&token=FNOM6HESUBQXNERX2XCC";


    console.log(queryUrlEventBright2);
    $.ajax({
      url: queryUrlEventBright3,
      crossDomain: true,
      method: "GET",
      header: {
        Authorization: "Bearer " + apiKeyEventBright
      }
    }).then(function (response) {
      console.log("eventbright RESPONSE");
      for (i = 0; i < response.events.length; i++) {
        console.log(response);
        // console.log(response.events);
        // console.log(response.events[i]);
        // if then statement if eventName === eventDescription then display name, else display both
        console.log(response.events[i].name.text + " event name is");
        var eventBrightResultsDiv = $("<div class= 'resultsDiv'>");
        $(".resultsDiv").css("margin", "5px");

        // display event name
        var eventName = response.events[i].name.text;
        var newRowEB = $("<div>").text(eventName);
        eventBrightResultsDiv.append(newRowEB);


      // display description of event
      var eventDescription = response.events[i].description.text;
      var newRowEB3 = $("<div>").text(eventDescription);
      eventBrightResultsDiv.append(newRowEB3);
  
        // display date
        var eventDate = response.events[i].start.local;
        var newRowEB2 = $("<div>").text(eventDate);
        eventBrightResultsDiv.append(newRowEB2);




        $("#eventResultsDiv").append(eventBrightResultsDiv);
      }
      
    });// end of event bright api search


    // start of weather api 

    var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryUrlWeather = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + city + "," + state + "&units=imperial&appid=" + APIKeyWeather;

    // weather search for 5 days
    // var queryUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?q=+"+city+",us&mode=xml&appid=166a433c57516f51dfab1f7edaed8413";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryUrlWeather,
      method: "GET"
    })
      .then(function (response) {
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









  }; // end of first click api searches

// on botton click change search results to free or paid only
$("#priceBtn").on("click", function(){
  if(price == "paid"){
    price = "free";
    console.log(price);
$("#priceBtn").css("background-color", "green");
  }else{
    price = "paid"
    console.log(price);
    $("#priceBtn").css("background-color", "red");
  }
})
  // on btn click to display sports events in event section
  $("#btn-sports-events").on("click", function () {

    //ticket master api
    var queryUrlticketMaster = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&apikey=NtN7MU9VFD2GfjlT4c4sHG3IZgXVGQtG";

    console.log(queryUrlticketMaster + " ticket master query url");
    $.ajax({
      url: queryUrlticketMaster,
      method: "GET"
    }).then(function (response) {
      console.log(response + " my response is");
      console.log(response._embedded);
      console.log(response._embedded.events);
      for (i = 0; i < response._embedded.events.length; i++) {
        console.log(response._embedded.events[i].name);
        var eventName = response._embedded.events[i].name;
        var newRow = $("<div>").text(eventName);

        // adding date to game
        var eventDate = response._embedded.events[i].dates.start.localDate;
        var newTD1 = $("<div>").text(eventDate);
        newRow.append(newTD1);

        // add to event results div
        $("#eventResults").html(newRow);
      }




    });// end of ticket master api search
  }); // end of on sports events click

  // calling function to show api search
  $(document).on("click", "#submit", displayapi);


}); // end of on load function