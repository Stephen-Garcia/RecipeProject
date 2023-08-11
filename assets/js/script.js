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


