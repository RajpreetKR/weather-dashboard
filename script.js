
let forecastContainer = $('#forecast')  // document.querySelector()
let curretContainer = $('#today')  // document.querySelector()
let historyContainer = $('#history')  // document.querySelector()

let userInput = $('#search-input');
let button = $('#search-button');

let cityDiv = $("#city");
let weatherIcon = $("#weather-icon");
let weatherInfo = $("#weather-info");
let tempDiv = $("#temp");
let windDiv = $("#wind");
let humidityDiv = $("#humidity");

// Grab Existing data from localStorage
let cities = JSON.parse(localStorage.getItem("cities"));
console.log(cities);
if (cities === null) {
    cities = [];
}

button.on('click', function(event) {
    event.preventDefault();

    let city = userInput.val();
    console.log("City: ", city);

    // checks if input is empty
    if (!city) {
        alert("Please enter a city.");
        return;
    }

    console.log(cities);
    cities.push(city);

    // we have TWO diffenerent operations that need to take place
    // save city --> to localStorage --> Add to historyContainer

    localStorage.setItem("cities", JSON.stringify(cities));

    let searchHistory = $("<button></button>").text(city);
    historyContainer.append(searchHistory);

    // makes a request to an API 
    console.log("I am code BEFORE the fetch/ASYNC method");
    const apiKey = "9564ca6e43e7b3805e7aa62c93244e8c";
    let baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;

    console.log("Request URL: ", baseUrl);

    fetch(baseUrl)          // is an Async method that RETURNS a PROMISE --> Handling a Promise
        .then(function(response) {
            console.log("I am code INSIDE the SUCCESS RESPONSE fetch/ASYNC method");
            console.log("Response Object: ", response);
            // SUCCESS STATE
            return response.json();
        })
        .then(function(data) {
            console.log("Data: ", data);

            // HERE in this callback function SCOPE we have acess to the requested DATA

            // digs INTO the dataset (object)
            let lattitude = data.coord.lat;
            let longitude = data.coord.lon;// gets the lat and lon from the data
            let forecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude + "&appid=" + apiKey;

            showWeather(data);
        })
        .catch(function(error) {
            // ERROR STATE
            console.log("Error: ", error);
            alert("Error fetching current weather data. PLease try again.")
        })

    console.log("I am code AFTER the fetch/ASYNC method");

    function showWeather(data) {
    let cityName = data.name;
    let weatherDesc = data.weather[0].description;
    let temperature = Math.round(data.main.temp - 273.15); // converts to celsius
    let windSpeed = data.wind.speed;
    let humidityInfo = data.main.humidity;

    cityDiv.text(cityName);
    weatherInfo.text(weatherDesc);
    tempDiv.text(temperature);
    windDiv.text(windSpeed);
    humidityDiv.text(humidityInfo);
    }

    
})

for (let i=0; i<cities.length; i++) {
        let searchHistory = $("<button></button>").text(cities[i]);
        historyContainer.append(searchHistory);
    }