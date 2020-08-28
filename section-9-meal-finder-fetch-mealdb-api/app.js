const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  errorHeading = document.getElementById('error-heading'),
  single_mealEl = document.getElementById('single-meal');
// search meal & fetch from API
function searchMeal(e) {
  e.preventDefault();
  const query = search.value; // get search query
  if (query.trim()) {
    // check for empty search val
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
    `;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${query}:'</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No Search results. Try again... 🤷‍♂️`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
              <div class="meal"> 
                <img src="${meal.strMealThumb} alt="${meal.strMeal}" /> 
              <div class="meal-info" data-mealID="${meal.idMeal}"> 
                <h3>${meal.strMeal}</h3> 
              </div> 
              </div>
              `
            )
            .join('');
        }
      });
    search.value = ''; // clear val of search query
  } else {
    errorHeading.innerHTML = `<h1 class="error">Enter a correct value ❌</h1>`;
    window.setTimeout(() => {
      errorHeading.innerHTML = '';
    }, 2000);
  }
}

// fetch meal by id
function getMealById(mealID) {
  const ID_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(ID_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>  
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}` : ''}  
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}  
    </div> 
    <div class="main">
      <p>${meal.strInstructions}</p> 
      <h2>Ingredients</h2>
      <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div> 
  </div>
  `;
}

function getRandomMeal() {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  const random_URL = `https://www.themealdb.com/api/json/v1/1/random.php`;
  fetch(random_URL)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
