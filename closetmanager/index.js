const foodDiv = document.querySelector(".food");
const url = "http://localhost:1337/api/fooditems"
let allFood = []

const addfoodForm = document.forms.addfood;
const foodTitle = addfoodForm.foodtitle;
const expirationDate = addfoodForm.expirationdate;
addfoodForm.addEventListener("submit", addFood);

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
      renderFood(allFood)
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderFood(food) {
  let list = [];
  food.forEach((f) => {
    const item = `<li>${f.attributes.title}</li>`;
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
    .then((response) => {
      console.log("reponse", response);
      // reset
      foodTitle.value = "";
      expirationDate.value = "";
      // récupérer les dernières entrées
      getFood();
    })
    .catch((err) => {
      console.error(err);
    });
}
