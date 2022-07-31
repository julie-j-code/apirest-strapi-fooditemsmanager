const foodDiv = document.querySelector(".food");
const url = "http://localhost:1337/api/fooditems"
let allFood = []

const addfoodForm = document.forms.addfood;
const foodTitle = addfoodForm.foodtitle;
const expirationDate = addfoodForm.expirationdate;
addfoodForm.addEventListener("submit", addFood);
let lastAddedItem = null;

// event delegation & delete item
foodDiv.addEventListener("click", deleteFoodItem);

init()

function init() {
  getFood();
}

function getFood() {
  fetch(`${url}?sort=expirationdate:ASC`)
    .then((data) => data.json())
    .then((result) => {
      allFood = result.data;
      console.log("allFood", allFood);
      renderFood(allFood);
      if (lastAddedItem !== null) {
        flashLastAddedItem(lastAddedItem);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderFood(food) {
  let list = [];
  food.forEach((f) => {
    const item = `<li id="${f.id}"><button data-id="${f.id}">x</button> ${f.attributes.title}</li>`;
    console.log(item);
    list = [...list, item];

  });
  console.log(list)
  foodDiv.innerHTML = `<ul>${list.join(" ")}</ul>`
}


function addFood(e) {
  e.preventDefault();
  console.dir(e.target);
  const title = foodTitle.value.trim();
  const date = expirationDate.value;
  console.log(title, date);

  // ça, c'était avant !!!! la V4
  // const payload =
  //   {
  //     title: title,
  //     expirationdate: date,
  //     category: "default",
  //   } 

  const payload = {
    "data": {
      title: title,
      expirationdate: date,
      category: "default",
    }
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data en retour", data.data.id);
      // reset
      foodTitle.value = "";
      expirationDate.value = "";
      // récupérer les dernières entrées
      lastAddedItem = data.data.id;
      getFood();
    })
    .catch((err) => {
      console.error(err);
    });
}


function flashLastAddedItem(item) {
  console.log("item ajouté", item);
  const lastAddedItemElement = document.getElementById(`${item}`);
  console.log(item.id, lastAddedItemElement);

  lastAddedItemElement.classList.add("just-added");

  setTimeout(() => {
    lastAddedItemElement.classList.remove("just-added");
    lastAddedItem = null;
  }, 2000);
}

function deleteFoodItem(e) {
  if (e.target.nodeName.toLowerCase() !== "button") {
    return;
  }
  // const parentDiv = e.target.parentElement;
  const foodItemId = e.target.parentNode.id;
  // console.dir(e.target.parentNode);
  console.log("foodItemId", foodItemId);
  fetch(`${url}/${foodItemId}`, {
    method: "DELETE"
  }).then((res) => {
    console.log(res.json());
    getFood();
  });
}