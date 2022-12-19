const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = '';
const APP_ID = 'e1c9809f';
const APP_Key = 'bc7caa5e153f4bd779450f8db6cd6db7';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery);
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = ` https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    // console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `
        <div class="item">   
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
      </div> 
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
