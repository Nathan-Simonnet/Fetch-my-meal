// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
// 'https://www.themealdb.com/api/json/v1/1/search.php?s='
console.log("fetchmymeal")

const inputText = document.getElementById('input-text');
const main = document.querySelector('main');

const mealDisplayer = function (data) {

    const card = document.createElement("div");
    main.appendChild(card);
    card.classList.add('card')

    const titleContainer = document.createElement("div");
    card.appendChild(titleContainer);
    titleContainer.classList.add('title-container')

    const title = document.createElement("h2");
    titleContainer.appendChild(title);
    title.textContent = "Canard Laqué";

    const imgContainer = document.createElement("div");
    card.appendChild(imgContainer);
    imgContainer.classList.add('img-container');

    const img = document.createElement("img");
    imgContainer.appendChild(img);
    img.src = "img/canard-laque.png"


    const ingredientsAndTitleContainer = document.createElement("div");
    card.appendChild(ingredientsAndTitleContainer);
    ingredientsAndTitleContainer.classList.add('ingredients-and-title-container')

    const ingredientTitleContainer = document.createElement("div");
    ingredientsAndTitleContainer.appendChild(ingredientTitleContainer);
    ingredientTitleContainer.classList.add('ingredients-title');

    const ingredientsTitle = document.createElement("p");
    ingredientTitleContainer.appendChild(ingredientsTitle);
    ingredientsTitle.textContent = "Ingredients";

    const ingredientsContainer = document.createElement("div");
    ingredientsAndTitleContainer.appendChild(ingredientsContainer);
    ingredientsContainer.classList.add('ingredients-container')

    const uls = document.createElement("ul");
    ingredientsContainer.appendChild(uls);

    const li1 = document.createElement("li");
    uls.appendChild(li1);
    li1.textContent = "truc";

    const li2 = document.createElement("li");
    uls.appendChild(li2);
    li2.textContent = "truc";
}

const mealFetcher = async function (e) {
    await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
        .then((response) => response.json()
            .then((data) => console.log(data.meals[0]))
            .catch((error) => console.log(error)));

    mealDisplayer();
}


inputText.addEventListener('input', () => {
    const word = inputText.value;
    console.log(word)

    mealFetcher();
});