const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading');

// search meal & fetch from API
function searchMeal(e) {
  e.preventDefault();
  const query = search.value; // get search query
  if (query.trim()) {
    // check for empty search val
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
}; 


submit.addEventListener('submit', searchMeal); 


// const search = document.getElementById('search'),
//   submit = document.getElementById('submit'),
//   random = document.getElementById('random'),
//   mealsEl = document.getElementById('meals'),
//   resultHeading = document.getElementById('result-heading'),
//   single_mealEl = document.getElementById('single-meal'),
//   errorHeading = document.getElementById('error-heading');

// // EVENT LISTENERS

// function searchMeal(e) {
//   e.preventDefault();
//   single_mealEl.innerHTML = '';
//   const query = search.value;
//   if (query.trim()) {
//     const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         resultHeading.innerHTML = `<h2>Search results for '${query}' : </h2>`;
//         if (data.meals === null) {
//           resultHeading.innerHTML = `<h2>No search results for '${query}' 🤷‍♂️</h2>`;
//         } else {
//           mealsEl.innerHTML = data.meals
//             .map(
//               (meal) => `
//               <div class="meal">
//               <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
//               <div class="meal-info" data-mealID="${meal.idMeal}">
//               <h3>${meal.strMeal}</h3>
//               </div>
//             <div>
//             `
//             )
//             .join('');
//         }
//       });
//     search.value = ''; // clear search query
//   } else {
//     errorHeading.innerHTML = `<h1 class="error">Enter a correct value ❌</h1>`;
//     window.setTimeout(() => {
//       errorHeading.innerHTML = '';
//     }, 2000);
//   }
// }

// submit.addEventListener('submit', searchMeal);
// mealsEl.addEventListener('click', e => {
// const mealInfo = e.path.find(item => {
//  if(item.classList){
//    return item.classList.contains('meal-info');
//  }else {
//    return false;
//  }
// });
// console.log(mealInfo)
// });
