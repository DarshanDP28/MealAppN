console.log("on fav");

function checkOnline() {
  if (!navigator.onLine) {
    window.alert("connect to internt ");
  }
}
checkOnline();

 // RegExp \D Metacharacter
 var hasNumber = /\d/;

//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem("meal-favourites").split(/(\s+)/);

// function to check if storage is empty 
   function ifEmptyRedirect() {
   let itemString = item.toString();
  let resCheck = hasNumber.test(itemString);
  if (!resCheck) {
    window.alert("add something");
    window.location.href = "index.html";
  }
  console.log(resCheck);
}

ifEmptyRedirect();

//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
  getMeal(id);
}


//this function fetches a meal with a specific id
function getMeal(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        createFavItem(data);
      }
    });
}
// HTML code for the individual search result/food item
let mealList = document.getElementById("meal");
function createFavItem(res) {
  for (res of res.meals) {
    
  var foodItem = `
    <div class = "meal-item" data-id = "${res.idMeal}">
    <div class = "meal-img">
        <img src = "${res.strMealThumb}" alt = "food">
    </div>
    <div class = "meal-name">
        <h3>${res.strMeal}</h3>
        <div class="btns">
       
        <button type="submit" class="btnrem "><a href = "info.html?id=${res.idMeal}" value="${res.idMeal}" class = "recipe-btn">Get Recipe</a></button>
        
      
          <button type="submit" class="btnrem recipe-btn favorite-button" id="${res.idMeal}">Remove</button>
         
      </div>
</div>
    </div>
</div>`;
    // appending the result to the root 'recipie-list' div
    mealList.innerHTML = foodItem + mealList.innerHTML;
  }
}


// Remove All Favorites
 function clearAllFun() {
  if (window.confirm("remove all")) {
      window.localStorage.clear();
      window.location.href = "index.html";
      
  }

  else {
    window.alert("ADD meals from Meals REDIRECTINNG");
    window.location.href = "index.html";
  }
}

  // Removeing favorite-meal when  click on remove button
   document.body.addEventListener("click", function (event) {
    console.log("click");
      //if the targeted div is 'favourite-button'
      if (event.target.getAttribute("class").includes("favorite-button")) {
        //finding the id of the current food item
        let id = event.target.getAttribute("id");
        //finding it's index in the item array
        let index = item.indexOf(id);

        //removing item from the array
        item.splice(index, 1);

        //creating the updated list of favourite items in a space sperated string
        let items = "";
        for (let i of item) {
          items = items + " " + i;
        }

        //storing the updated string in local storage
        window.localStorage.setItem("meal-favourites", items);
        console.log("returing");
        console.log(item);

        //refreshing the page
        location.reload();
      }
  });