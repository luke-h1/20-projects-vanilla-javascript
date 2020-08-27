const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('meal');

// EVENT LISTENERS

function searchMeal(e) {
  e.preventDefault(); 
  single_mealEl.innerHTML = ''; 
  const query = search.value; // get search term
  // check for empty query 
  if(query.trim()){
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });  
    
  }else { 
    const div = document.getElementById('result-heading') 
    const errorMsg = `
    <h1 class="error"> Enter a correct value ❌`; 
    div.innerHTML = errorMsg; 
    window.setTimeout(() => { 
      div.innerHTML = ''; 
    }, 2000)
  }
}

submit.addEventListener('submit', searchMeal);
