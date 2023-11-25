// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
// 'https://www.themealdb.com/api/json/v1/1/search.php?s='
// 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'
console.log("fetchmymeal")
const inputText = document.getElementById('input-text');

const mealDisplayer = function (data) {

    if (document.querySelector('main')) {
        console.log(document.querySelector('main'))
        document.querySelector('main').remove();
        console.log(document.querySelector('main'))
    }

    for (let i = 0; i < data.length; i++) {
        const main = document.createElement("main");
        document.body.appendChild(main);

        const card = document.createElement("div");
        main.appendChild(card);
        card.classList.add('card')

        const titleContainer = document.createElement("div");
        card.appendChild(titleContainer);
        titleContainer.classList.add('title-container')

        const title = document.createElement("h2");
        titleContainer.appendChild(title);
        title.textContent = data[i].strMeal;

        const imgContainer = document.createElement("div");
        card.appendChild(imgContainer);
        imgContainer.classList.add('img-container');

        const img = document.createElement("img");
        imgContainer.appendChild(img);
        img.src = data[i].strMealThumb;

        const ingredientsAndTitleContainer = document.createElement("div");
        card.appendChild(ingredientsAndTitleContainer);
        ingredientsAndTitleContainer.classList.add('ingredients-and-title-container')

        const ingredientTitleContainer = document.createElement("div");
        ingredientsAndTitleContainer.appendChild(ingredientTitleContainer);
        ingredientTitleContainer.classList.add('ingredients-title-container');

        const ingredientsTitle = document.createElement("h3");
        ingredientTitleContainer.appendChild(ingredientsTitle);
        ingredientsTitle.textContent = "Ingredients";

        const ingredientsContainer = document.createElement("div");
        ingredientsAndTitleContainer.appendChild(ingredientsContainer);
        ingredientsContainer.classList.add('ingredients-container')

        let index = 1;
        let currentIngredient = `strIngredient${index}`;
        let currentMeasure = `strMeasure${index}`;

        while (data[i][currentIngredient]) {

            const li = document.createElement("p");
            ingredientsContainer.appendChild(li);
            li.textContent = data[i][currentIngredient] + " - " + data[i][currentMeasure]

            index++;
            currentIngredient = `strIngredient${index}`;
            currentMeasure = `strMeasure${index}`;
        }
    }
    setTimeout(() => {
        console.log(document.querySelector('main'))
    }, 1000)

}

let dataFilter = "";
// datFilter goes to mealFtecher
let word = "";
// word come frome inoput event listener
const mealFetcher = async function (letters) {

    await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + letters)
        .then((response) => response.json()
            .then((data) =>
                dataFilter = data.meals.filter((meal) =>
                    meal.strMeal.toLowerCase().includes(word)
                ))
        );
    console.log(dataFilter)

    mealDisplayer(dataFilter);
}

inputText.addEventListener('input', (e) => {
    if (e.target.value) {
        word = e.target.value.toLowerCase();
        mealFetcher(word[0]);
    }

});