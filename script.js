// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
// 'https://www.themealdb.com/api/json/v1/1/search.php?s='
// 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'
console.log("fetchmymeal")
const inputText = document.getElementById('input-text');

// Display meal from an array, filter by letter/word
const mealDisplayer = function (data, empty) {

    const main = document.querySelector('main');
    if (main.firstChild) {
        while (main.firstChild) {
            main.firstChild.remove();
        }
    }

    if (empty) {
        return main.textContent = data;
    }

    for (let i = 0; i < data.length; i++) {
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
        ingredientsAndTitleContainer.classList.add('ingredients-and-title-container');

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


    console.log(document.querySelector('main'))


    document.querySelectorAll('.ingredients-and-title-container').forEach((container) => {
        container.addEventListener('click', (e) => {
            container.classList.toggle("clicked")
        });
    });

}

// I'm not familiar with "catch" so, for now , old school methods
let isDataNull = "";
// datFilter goes to mealFtecher
let dataFilter = "";
// word come frome inoput event listener
let word = "";

// Fetch API + letters wich com from the eventListener
const mealFetcher = async function (letters) {

    try {
        let isDataNull = false;

        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + letters);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data.meals == null) {
            isDataNull = true;
            return mealDisplayer("Oops, we found nothing like that... Try again!", true);
        }

        const dataFilter = data.meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(word)
        );

        console.log(dataFilter);

        if (!isDataNull) {
            if (dataFilter.length === 0) {
                mealDisplayer("Oops, we found nothing like that... Try using a different spelling!", true);
            } else {
                mealDisplayer(dataFilter);
            }
        }
    } catch (error) {
        // Handle the error
        console.error('An error occurred:', error.message);
        mealDisplayer('An error occurred. Please try again later, or maybe using a different spelling.', true);
    }

}


// the more you write, the more it specifies
inputText.addEventListener('input', (e) => {
    if (e.target.value) {
        word = e.target.value.toLowerCase();
        mealFetcher(word[0]);
    } else {
        mealDisplayer("", true)
    }
});

// Light / dark mode adding a class

// const lightMode = document.querySelector('.toggle-switch')

// lightMode.addEventListener('click', (e) => {
//     lightMode.classList.toggle("dark-mode")
// });

const toggleSwitch = document.querySelector('.toggle-switch');

toggleSwitch.offsetWidth;

toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle("dark-mode");
    const root = document.documentElement;
    root.classList.toggle("dark-mode")


});