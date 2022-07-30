const foodDiv = document.querySelector(".food");
const url = "http://localhost:1337/api/fooditems"
let allFood = []
init()

function init(){
    getFood();
}

function getFood(){
    fetch(`${url}?sort=expirationdate:ASC`)
    .then((data) => data.json())
    .then((result)=>{
        allFood=result.data;
        console.log("allFood", allFood);
        renderFood(allFood)
    })
    .catch((err)=>{
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
foodDiv.innerHTML=`<ul>${list.join(" ")}</ul>`
}
