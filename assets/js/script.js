// Pseudocode

// User Story:
// As someone who likes to cook with a focus on healthy and nutritious meals, I'm eager to utilize this app to discover and prepare recipes that align with my dietary preferences.


// Acceptance Criteria:
// When searching for recipes, I can use keywords, ingredients, or dietary preferences.
// Then I receive relevant search results based on my input.
    // Api function that connects user input (.value) with the search or form element. 


// When filtering recipes, I can select options like cooking time, difficulty, and dietary restrictions.
// Then I can easily find recipes that match my specific criteria.

// When viewing a recipe, I can see the list of ingredients, step-by-step instructions, cooking time, serving size, and nutrition details.
// Then I have all the necessary information to prepare the recipe accurately.


var apiKeyRecipes = '64299c780dmsh3a32fb940d8a24ep1e4c36jsn3be13eb68050'
var apiKeyNutrients = '64299c780dmsh3a32fb940d8a24ep1e4c36jsn3be13eb68050'
var submitEl = document.getElementById('btn')

d
function getRecipes() {

    fetch('https://tasty.p.rapidapi.com/recipes/list')
        .then(function (response) {

            return response.json();
        })

        .then(function (data) {

            console.log(data)

            //    var lat = data.coord.lat
            //    var lon = data.coord.lon

            //    searchApi(lat, lon)
        })
};

function searchApi(lat, lon) {

    fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/nutrients')

        .then(function (response) {

            return response.json();
        })

        .then(function (data) {

            //    console.log(data)
        })
};



// submitEl.addEventListener('click', getRecipes);


var apiKey = "a4bf9990bcf9632efd2074e14211ea95";

// Get DOM Elements
var searchBarEl = document.querySelector('#search-bar');
var searchFormEl = document.querySelector('#search-form');
var searchHistoryEl = document.querySelector('#search-history');
var currentWeatherEl = document.querySelector('#current-weather');
var forecastContainerEl = document.querySelector('#forecast-container');

// Fetch weather data from OpenWeatherMap API for the given city
function getApi(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            searchApi(lat, lon, city);
        });
}

// Fetch 5-day forecast data from OpenWeatherMap API using lat and lon
function searchApi(lat, lon, city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data, city);
        });
}

// Display current weather conditions
function displayWeather(data, city) {
    var currentWeather = data.list[0];
    currentWeatherEl.innerHTML = `
        <h2>${city} (${new Date().toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}"></h2>
        <p>Temperature: ${(currentWeather.main.temp - 273.15).toFixed(2)} °C</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;

    // Display 5-day forecast
    forecastContainerEl.innerHTML = '';
    for (var i = 0; i < data.list.length; i += 8) {
        var forecast = data.list[i];
        var forecastDate = new Date(forecast.dt * 1000);
        forecastContainerEl.innerHTML += `
            <div class="forecast-card">
                <p>${forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                <p>Temperature: ${(forecast.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            </div>
        `;
    }
}


function handleSearchFormSubmit(event) {
    event.preventDefault();
    var city = searchBarEl.value.trim();
    if (city) {
        getApi(city);
        searchBarEl.value = '';
    }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


