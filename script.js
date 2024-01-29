// What references should we GRAB onto?
var forecastContainer = $('#forecast')  // document.querySelector()
var curretContainer = $('#today')  // document.querySelector()
var historyContainer = $('#history')  // document.querySelector()

var userInput = $('#search-input');
var button = $('#search-button');

// Grab Existing data from localStorage

button.on('click', function(event) {
    event.preventDefault();
   //  console.log("click....");

    // what is our next step(?)  --> what are we trying to capture(?)
    var city = userInput.val();
    console.log("City: ", city);

    // we have TWO diffenerent operations that need to take place
    // save city --> to localStorage --> Add to historyContainer
    // we make a request to an API 

    console.log("I am code BEFORE the fetch/ASYNC method")
    var apiKey = "9564ca6e43e7b3805e7aa62c93244e8c"
    var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;

    console.log("REquest URL: ", baseUrl)

    fetch(baseUrl)          // is an Async method that RETURNS a PROMISE  --> Handling a PRomise
        .then(function(response) {
            console.log("I am code INSIDE the SUCCESS RESPONSE fetch/ASYNC method")
            console.log("Response Object: ", response)
            // SUCCESS STATE
            return response.json();
        })
        .then(function(data) {
            console.log("Data: ", data);

            // HERE in this callback function SCOPE we have acess to the requested DATA

            // dig INTO our dataset (object)
            console.log("Lattitude: ", data.coord.lat)
            console.log("Longitude: ", data.coord.lon)
        })
        .catch(function(error) {
            // ERROR STATE
            console.log("Error: ", error);
        })

    console.log("I am code AFTER the fetch/ASYNC method")
})