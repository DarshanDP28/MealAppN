console.log("on info");
console.log(window.location.href);

function checkOnline() {
  if (!navigator.onLine) {
    window.alert("connect to internt ");
  }
}
checkOnline();

// TO fetch recipe of mealId sended through URL clicked from homepage
function fetchRecipe() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("=") + 1);
  

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      html = "";
      if (data.meals) {
        // createFavItem(data);
        console.log("hello ", data.meals);
        data.meals.forEach((meal) => {
          html += `<div class="details-conatiner">
              <div class="meals-desc">
              <h2 class="line"> ${meal.strMeal}</h2>
              
              <p > Its a <big>${meal.strArea}</big> ${meal.strCategory} Dish</p>
              </div>

              <div class="mealsIng">

               <h4>Required Indgredient for this dish</h4>
               
               <span>${meal.strIngredient1},${meal.strIngredient2},${meal.strIngredient3},${meal.strIngredient4},${meal.strIngredient5}</span>
              </div>
              <div class="mealImage">
               <img src="${meal.strMealThumb}" alt="Meal Image"> 
              </div>
              


               <div class="mealPrep" height:100vh width:70% ">
              <h4>DIRECTIONS</h4>
              
                <p  class="instruction" >${meal.strInstructions}</p>
                
  
                <div>
                 <button class="button is-warning is-light "
                  onclick="functionToExecute(${meal.idMeal})"><b>ADD FAV<b>
                </button>
                
              <div class= "mealsFooter" style="width:500px;height:300px">
              <p>
              <h4>Watch Meal Video on <a href="${meal.strYoutube}" target= "blank">YOUTUBE</a></h1>
              <h4>Give Shoutout to Creater and get similars recipes at  <a href="${meal.strSource}" target= "blank">HERE</a> </h2>
              </p>
            </div>
              
              


            </div>`;
        });
        let recipecontainer = document.getElementById("info-container");
        recipecontainer.innerHTML = html;
      }
    });
}

fetchRecipe();

//Add to Favorites from recipe
let fav = window.localStorage.getItem("meal-favourites");
if (!fav) {
  window.localStorage.setItem("meal-favourites", "");
}
function functionToExecute(id) {
  let items = window.localStorage.getItem("meal-favourites");

  //if id already present in local storage we do not add and return
  if (items.includes(id)) {
    swal({
      text: " alerdy Added to favroites",
    });
    return;
  }
  items = items + " " + id;

  window.localStorage.setItem("meal-favourites", items);

  swal("Added to favourites", {
    buttons: false,
    timer: 1000,
  });
}
