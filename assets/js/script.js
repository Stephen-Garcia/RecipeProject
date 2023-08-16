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


var submitEl = document.getElementById('btn')

function getRecipes(query) {
  const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&tags=under_30_minutes&q=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '64299c780dmsh3a32fb940d8a24ep1e4c36jsn3be13eb68050',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const recipeResults = document.getElementById('recipe-results');
      recipeResults.innerHTML = '';

      data.results.forEach(function (recipe) {
        const recipeCard = createRecipeCard(recipe);
        recipeResults.appendChild(recipeCard);
      });
    });
}

function nutrition(nutritionalQuery) {
  const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${nutritionalQuery}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '64299c780dmsh3a32fb940d8a24ep1e4c36jsn3be13eb68050',
      'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
  };
  
fetch(url, options)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
};


// creates a card that displays data pulled from the APIs
function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-3', 'recipe-card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'p-2');
  const instructionList = document.createElement('ol')
  recipe.instructions.forEach(function (instruction) {
    const instructionListItem = document.createElement('li')
    instructionListItem.textContent = instruction.display_text
    instructionList.appendChild(instructionListItem);
  });
  

  const title = document.createElement('h6');
  title.classList.add('card-title', 'mb-2');
  title.textContent = recipe.name;

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'img-fluid', 'recipe-image'); //img-fluid applies max width to 100%

  image.style.maxHeight = '250px';

  image.src = recipe.thumbnail_url;
  image.alt = recipe.name;

  cardBody.appendChild(title);
  cardBody.appendChild(image);
  cardBody.appendChild(instructionList);

  card.appendChild(cardBody);

  return card;
}


function createNutritionalCard(nutrition) {
  const nutritionalCard = document.createElement('div');
  nutritionalCard.classList.add('card', 'nutritional-card', 'p-1');
  
  const nutritionBody = document.createElement('div')
  nutritionBody.classList.add('nutrition-body', 'mb-auto' )
  nutritionBody.textContent = data.calories
  nutritionalCard.appendChild(nutritionBody);

  return nutritionalCard;

}

var searchNutritionEl = document.getElementById('search-nutrition-input');
var searchNutritionButton = document.getElementById('search-nutrition-button');

document.getElementById('search-button').addEventListener('click', function () {
  const query = document.getElementById('recipe-query').value;
  getRecipes(query);
});

document.getElementById('recipe-query').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const query = document.getElementById('recipe-query').value;
    getRecipes(query);
  }
});

// saves search queries to local storage
function saveSearch(query) {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  const searchItem = {
    query: query,
    timestamp: new Date().toLocaleString()
  };

  searchHistory.push(searchItem);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// this function retrieves and displays data from previous searches that were stored in local storage.
function displayPreviousSearches() {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const nutritionResults = document.getElementById('nutrition-results');

  nutritionResults.innerHTML = '';

  // this shows the 5 most recent searches.
  const recentSearches = searchHistory.slice(-5).reverse();

  recentSearches.forEach(function (searchItem) {
    const searchItemDiv = document.createElement('div');
    searchItemDiv.classList.add('previous-search-item');

    const query = document.createElement('p');
    query.textContent = searchItem.query;

    query.addEventListener('click', function () {
      const savedQuery = searchItem.query;
      
      document.getElementById('recipe-query').value = savedQuery;
      getRecipes(savedQuery);
    });

    searchItemDiv.appendChild(query);

    nutritionResults.appendChild(searchItemDiv);
  });
}


document.getElementById('search-button').addEventListener('click', function () {
  const query = document.getElementById('recipe-query').value;
  getRecipes(query);
  saveSearch(query);
});


document.getElementById('search-nutrition-button').addEventListener('click', function () {
  const nutritionalQuery = document.getElementById('nutritional-query').value;

  nutrition(nutritionalQuery);
});

document.getElementById('show-previous-searches').addEventListener('click', function (event) {
  event.preventDefault();
  displayPreviousSearches();
});


// document.getElementById('recipe-search-form').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const query = searchNutritionEl.value;
//     const dietaryPreference = document.getElementById('dietary-preference').value;

//     getRecipes(query, dietaryPreference);
// });


// submitEl.addEventListener('click', getRecipes);


// var apiKey = "a4bf9990bcf9632efd2074e14211ea95";


// var searchBarEl = document.querySelector('#search-bar');
// var searchFormEl = document.querySelector('#search-form');
// var searchHistoryEl = document.querySelector('#search-history');
// var currentWeatherEl = document.querySelector('#current-weather');
// var forecastContainerEl = document.querySelector('#forecast-container');


// function getApi(city) {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var lat = data.coord.lat;
//             var lon = data.coord.lon;
//             searchApi(lat, lon, city);
//         });
// }


// function searchApi(lat, lon, city) {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             displayWeather(data, city);
//         });
// }


// function displayWeather(data, city) {
//     var currentWeather = data.list[0];
//     currentWeatherEl.innerHTML = `
//         <h2>${city} (${new Date().toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}"></h2>
//         <p>Temperature: ${(currentWeather.main.temp - 273.15).toFixed(2)} °C</p>
//         <p>Humidity: ${currentWeather.main.humidity}%</p>
//         <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
//     `;

   
//     forecastContainerEl.innerHTML = '';
//     for (var i = 0; i < data.list.length; i += 8) {
//         var forecast = data.list[i];
//         var forecastDate = new Date(forecast.dt * 1000);
//         forecastContainerEl.innerHTML += `
//             <div class="forecast-card">
//                 <p>${forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
//                 <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
//                 <p>Temperature: ${(forecast.main.temp - 273.15).toFixed(2)} °C</p>
//                 <p>Humidity: ${forecast.main.humidity}%</p>
//                 <p>Wind Speed: ${forecast.wind.speed} m/s</p>
//             </div>
//         `;
//     }
// }


// function handleSearchFormSubmit(event) {
//     event.preventDefault();
//     var city = searchBarEl.value.trim();
//     if (city) {
//         getApi(city);
//         searchBarEl.value = '';
//     }
// }

// searchFormEl.addEventListener('submit', handleSearchFormSubmit);


