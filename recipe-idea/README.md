Recipe Ideas App

A simple web application built with React that helps users discover recipes based on ingredients.
It uses the free TheMealDB API to fetch meal data and display recipe instructions.

🚀 Features

🔍 Search by Ingredient – Type an ingredient (e.g., “chicken”, “rice”, “egg”) to find recipes.

🖼 Recipe Grid – Displays results in a responsive grid with meal name & image.

📖 Modal with Instructions – Clicking on a meal opens a modal showing cooking instructions.

⚡ Responsive Design – Works on both desktop and mobile devices.

❌ Error Handling – Gracefully handles cases where no recipes are found or the API fails.

🛠️ Technology Stack

Framework: React

Styling: Tailwind CSS (or your choice if you used something else)

API: TheMealDB

Endpoints used:

Search by ingredient → https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}

Get recipe details → https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}

📦 Installation & Setup

Clone the repository and install dependencies:

git clone https://github.com/your-username/recipe-ideas-app.git
cd recipe-ideas-app
npm install


Run the development server:

npm start


Open http://localhost:3000
 in your browser.

🌍 Live Demo

👉 View on CodeSandbox
 (replace with your actual deployed link)

🧑‍💻 How It Works

User enters an ingredient in the search bar.

The app fetches recipe results from TheMealDB API.

Recipes are displayed in a grid layout.

Clicking a recipe card opens a modal with instructions on how to cook it.

📌 Future Improvements

Add filters by category/cuisine.

Save favorite recipes to local storage.

Add dark mode toggle.

📄 License

This project is for educational purposes (take-home challenge for Aginatha).