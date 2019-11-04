$(document).ready(function () {

// change eventResultsDiv => eventsResultsDiv



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

    // console.log(city);
    
    var apiKeyEventBright = "FNOM6HESUBQXNERX2XCC";
            // check daterange 
    var queryUrlEventBright2 = "https://www.eventbriteapi.com/v3/events/search/?q="+ eventType +"&location.address="+city+"&start_date.range_start="+date+"&token=FNOM6HESUBQXNERX2XCC";

    var queryUrlEventBright3 = "https://www.eventbriteapi.com/v3/events/search/?q="+ eventType +"&sort_by=best&location.address="+city+"&price="+price+"&start_date.range_start="+ startDate +"&start_date.range_end="+ endDate +"&token=FNOM6HESUBQXNERX2XCC";


    console.log(queryUrlEventBright3);
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
        $(".resultsDiv").css("border-style", "double");


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

// add link to event

// add costs

// add fav button


        $("#eventResultsDiv").append(eventBrightResultsDiv);
      }
      
    });// end of event bright api search

    // start of weather api 
    
    var weatherAPI = "880db94beca7f4a9dc073f7b0320f24d"; 


    // Here we are building the URL we need to query the database
    var queryUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q=" + city + "," + "us" + "&appid=" +     weatherAPI;


    $.ajax({
      url: queryUrlWeather,
      method: "GET"
    })
      .then(function (response) {
        console.log(queryUrlWeather);
        console.log(response);
        console.log("city name "+response.city.name)

        // div to hold overarching weather data
        var rowForWeatherResults = $("<div class='resultsDiv'>");
        
        var weatherCityName = response.city.name;
        var NWRow1 = $("<div>").text(weatherCityName);
        rowForWeatherResults.append(NWRow1);
        
        for(i=0; i < response.list.length; i+=3){
          console.log(response.list[i]);

          // date & time
          console.log(response.list[i].dt_txt);
          var dateTime = response.list[i].dt_txt;
          var NWRow2 = $("<div>").text("Date & Time: " + dateTime);
          rowForWeatherResults.append(NWRow2);

          // temp min response.list[i].main.temp_min
          console.log("min temp " + response.list[i].main.temp);
          var temp = response.list[i].main.temp;
          var NW3 = $("<div>").text(" Temp: " + temp);
          rowForWeatherResults.append(NW3);

          // weather (response.list[i].weather.description)
          console.log("weather condition " + response.list[i].weather[0].description);
          var weatherCondition = response.list[i].weather[0].description;
          var NW4 = $("<div>").text(weatherCondition);
          rowForWeatherResults.append(NW4);

            // wind   .wind.speed
          console.log("wind " + response.list[i].wind.speed);
          var wind = response.list[i].wind.speed;
          var NW5 = $("<div>").text("Wind Speed: "+wind);
          rowForWeatherResults.append(NW5);

          //humidity
          console.log("humidity "+ response.list[i].main.humidity);
          var humidity = response.list[i].main.humidity;
          var NW6 = $("<div>").text("humidity: "+ humidity);
          rowForWeatherResults.append(NW6);

          
          // add entire new div to weather results div
          $("#weatherResultsDiv").append(rowForWeatherResults);
          
        }; // end of loop for response.list
     

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
  $(document).on("click", "#submit", function(event) {
    event.preventDefault();
    
    displayapi();
  });


  //--------------------------------------Google News API Start---------------------------------------------//

  $(document).on("click", "#submit", function() {

    // Update this later 
    var city = $("#city").val().trim(); 

    var noSpacesCity = city.replace(" ", "%20")

    console.log("city is " + noSpacesCity); 

    // Update the URL
    var googleURL = "https://newsapi.org/v2/everything?q=" + noSpacesCity +"&sources=the-new-york-times,usa-today,abc-news&sortBy=relevancy&apiKey=963471a1dfbe44c6a4c1fa29c815655b";

    console.log("google news URL is " + googleURL);

    $.ajax({
        url: googleURL,
        method: "GET"
      }).then(function(result) {

        
        for (var i = 0; i < 5; i++) {

          var title = result.articles[i].title; 
          var newDateFormat = result.articles[i].publishedAt.substring(0,10);
          var date = moment(newDateFormat, "YYYY-MM-DD").format("MMM Do YYYY");
          var source = result.articles[i].source[1]; 
          var description = result.articles[i].description;
          var url = result.articles[i].url; 

          console.log($(result.articles[0].source.name)); 
          console.log(title);
          console.log(date);
          console.log(description);
          console.log(url);

          // div with News card
          var newsDiv = $(".news-section");

          var newItemCard = $("<div class='card news-card'></div>")

          var titleHeader = $("<h5>"+ title + "</h5>");

          var articleSource = $("<p>" + source + "</p>");

          var articleDate = $("<p>" + date + "</p>");

          var articleDesc = $("<p>" + description + "</p>");

          var urlButton = $("<a href='" + url + "' target='_blank' class='btn btn-primary'>"  + "Read Article" + "</a>");  

          newItemCard.append(titleHeader);
          newItemCard.append(articleSource);
          newItemCard.append(articleDate);
          newItemCard.append(articleDesc);
          newItemCard.append(urlButton);

          newsDiv.append(newItemCard);

          //  var imageArea = $("<div></div>"); 

          //  imageArea.addClass("img-div");

          //  var imageDiv = $("<img>").attr("src", dataStill); 

          //  imageDiv.addClass("click-area"); 

          //  imageDiv.attr("data-state", "still"); 

          //  imageDiv.attr("data-still", dataStill);

          //  imageDiv.attr("data-animate", dataAnimate);

          //  $(imageArea).append(imageDiv); 

          //  $(imageArea).append("<p>Rating: " + rating + "</p>"); 

          //  $(".gif-area").append(imageArea);

           // on click for class of sports 
           
        };
        
      });

});

  //--------------------------------------Google News API End---------------------------------------------//


}); // end of on load function