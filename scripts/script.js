const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");


// event listeners
searchBtn.addEventListener("click", getMealList);

// Show if not connecetd internet
function checkOnline(){
  if (!navigator.onLine) {
    window.alert("connect to internt ");
  }

} 
checkOnline();

// get meal list that matches with the search (term = indgrdeient)
function getMealList() {
  checkOnline();

  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <div class="btns">
                              <button type="submit" class="btnrem"><a href = "info.html?id=${meal.idMeal}" value="${meal.idMeal}" class = "recipe-btn">Get Recipe</a></button>
                              <button type="submit" class="btnrem recipe-btn" onclick="functionToExecute(${meal.idMeal})"> Fav</button>
                           </div>
                          </div>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}
//To Display meals on homepage before search input by user //Default Page
function fetchDefault() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <div class="btns">
                    <button type="submit" class="btnrem "><a href = "info.html?id=${meal.idMeal}" value="${meal.idMeal}" class = "recipe-btn">Get Recipe</a></button>
                     <button 
                      type="submit"
                      class="btnrem recipe-btn"
                      onclick="localSotre(${meal.idMeal})"
                       > Fav</button>
                  </div>
                </div>
            </div>
        `;
        });
        mealList.innerHTML = html;
      }
    });
}
fetchDefault();

//To  add id of favorite meal to local storage

let fav = window.localStorage.getItem("meal-favourites");
if (!fav) {
  window.localStorage.setItem("meal-favourites", "");
}
function localSotre(id) {
  let items = window.localStorage.getItem("meal-favourites");

  //if id already present in local storage we do not add and return
  if (items.includes(id)) {
    swal("Alredy ADDED");
    
     return;
  }
  //appending the new id to the string.
  //because local storage stores only string format.
  items = items + " " + id;

  //updating the local storage.
  window.localStorage.setItem("meal-favourites", items);
  swal("Added to favourites", {
   
    buttons: false,
    timer: 1000,
    
  });
}
