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


var apiKey = "a4bf9990bcf9632efd2074e14211ea95"
var liveCardEl = document.querySelector('#live-card')

function getApi() {
   var city = document.getElementById('search-bar').value;


   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey
   )
       .then(function (response) {

           return response.json();
       })

       .then(function (data) {

           console.log(data)

           var lat = data.coord.lat
           var lon = data.coord.lon

           searchApi(lat, lon)
       })
};

function searchApi(lat, lon) {

   fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)

       .then(function (response) {

           return response.json();
       })

       .then(function (data) {

           console.log(data)
       })
};



submitEl.addEventListener('click', getApi);


