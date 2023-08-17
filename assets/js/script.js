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
        console.log(data);// ali working here

        const nutritionResults = document.getElementById('nutrition-results');
        nutritionResults.innerHTML = '';
        
        var calories = data[0].calories
        var protein = data[0].protein_g
        var carbohydrates = data[0].carbohydrates_total_g
        var fats = data[0].fat_total_g
    
        const nutritionalCard = createNutritionalCard(calories, protein, carbohydrates, fats);
        nutritionResults.appendChild(nutritionalCard);
        
        console.log(calories, protein, carbohydrates, fats)
          
    });
  }
  

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

// nutrition card to display nutrition facts
function createNutritionalCard(calories, protein, carbohydrates, fats) {
  const nutritionalCard = document.createElement('div');
  nutritionalCard.classList.add('card', 'nutritional-card', 'p-2', 'd-inline-flex', 'flex-column', 'justify-content-center');
  
  const nutritionBody = document.createElement('div')
  nutritionBody.classList.add('card-body', 'nutrition-body');

  // Create an array of strings for the nutrition list
  const nutritionList = [
    calories + ' Calories',
    protein + 'g of protein',
    carbohydrates + 'g of carbs',
    fats + 'g of fat'
  ];

  // Create an unordered (bulleted) list element
  const nutritionListElement = document.createElement('ul');
  
  // Populate the list with nutrition data as list items
  nutritionList.forEach(function(itemText) {
    const listItem = document.createElement('li');
    listItem.textContent = itemText;
    nutritionListElement.appendChild(listItem);
  });

  // Append the list element to the nutrition body
  nutritionBody.appendChild(nutritionListElement);

  // Append the nutrition body to the nutritional card
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

// Search button to display nutrition card
document.getElementById('search-nutrition-button').addEventListener('click', function () {
  const nutritionalQuery = document.getElementById('nutritional-query').value;

  nutrition(nutritionalQuery);
});

document.getElementById('show-previous-searches').addEventListener('click', function (event) {
  event.preventDefault();
  displayPreviousSearches();
});