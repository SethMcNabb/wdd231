// Footer Information
const lastModifiedElement = document.getElementById('last-modified');
const currentYear = new Date().getFullYear();
document.getElementById("current-year").innerHTML = `&copy; ${currentYear} Seth McNabb | USA`;
const dateLastModified = new Date(document.lastModified).toDateString();
lastModifiedElement.innerHTML = `Last modified: ${dateLastModified}`;

// Responsive Navigation
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Random Meal API Call
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function fetchRandomMeal() {
    try {
        const response = await fetch(randomMealUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        displayMeal(data.meals[0]);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

fetchRandomMeal();

// Display Random Meal
function displayMeal(meal) {
    const mealDisplay = document.getElementById('meal-display');
    mealDisplay.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>
    `;
}

// Search by Ingredient API Call
async function searchByIngredient() {
    const ingredient = document.getElementById('ingredient-input').value.trim();
    const searchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
        const response = await fetch(searchUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

// Display Meals by Ingredient
function displayMeals(meals) {
    const mealResults = document.getElementById('meal-results');
    mealResults.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
            `;
            mealResults.appendChild(mealCard);
        });
    } else {
        mealResults.innerHTML = '<p>No meals found for that ingredient.</p>';
    }
}

// Categories API Call
async function fetchCategories() {
    const categoryUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    
    try {
        const response = await fetch(categoryUrl);
        const data = await response.json();
        const categorySelect = document.getElementById('category-select');

        data.meals.forEach(category => {
            const option = document.createElement('option');
            option.value = category.strCategory;
            option.textContent = category.strCategory;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

fetchCategories();

// Meals by Category API Call
async function fetchMealsByCategory() {
    const category = document.getElementById('category-select').value;
    const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    try {
        const response = await fetch(categoryUrl);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Search by Name API Call
async function searchMealByName() {
    const mealName = document.getElementById('meal-name-input').value.trim();
    if (!mealName) {
        alert('Please enter a meal name.');
        return;
    }

    const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    try {
        const response = await fetch(searchUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        displaySearchResults(data.meals);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Display Meals by Name
function displaySearchResults(meals) {
    const mealResults = document.getElementById('meal-results');
    mealResults.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>
            `;
            mealResults.appendChild(mealCard);
        });
    } else {
        mealResults.innerHTML = '<p>No meals found for that name.</p>';
    }
}

// Save for Later Form
document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const recipeDescription = document.getElementById('recipeDescription').value;

    const recipe = {
        name: recipeName,
        description: recipeDescription
    };

    const recipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(recipes));

    document.getElementById('recipeForm').reset();
    alert('Recipe saved for later!');
});

// View Saved Recipes
const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
const savedRecipesContainer = document.getElementById('savedRecipesContainer');

console.log('Saved Recipes:', savedRecipes); 
console.log('Container found:', savedRecipesContainer !== null);

if (savedRecipes.length === 0) {
    savedRecipesContainer.innerHTML = '<p>No saved recipes found.</p>';
} else {
    savedRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
        `;
        savedRecipesContainer.appendChild(recipeCard);
    });
}