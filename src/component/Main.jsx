import React from "react";
import { getRecipeFromMistral } from "../ai";
import ReactMarkdown from "react-markdown"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const ingredientsListItems = ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
    });

    function handleSubmit(formData) {
        const ingredient = formData.get("ingredient");
        if (ingredient){
            setIngredients((prev) =>{
                return [...prev, ingredient];
            });
        }
    }


    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return (
        <main>
            <form action={handleSubmit} className="add-ingredient-form">
                <input type="text" aria-label="Add Ingredient" placeholder="e.g. oregano" name="ingredient"/>
                <button type="submit"><span>+</span>Add ingredient</button>
            </form> 
            {ingredients.length > 0 && 
            <div className="ingredients-found">
                <h1>Ingredients Found:</h1>
                <ul>
                    {ingredientsListItems}
                </ul>
            </div>}
            {ingredients.length > 0 && recipe.length == 0 &&
            <div className="get-recipe-container">
                    <div className="text-content">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe form your list of ingredients</p>
                    </div>
                    <div className="button-content">
                        <button onClick={getRecipe}>Get a recipe</button>
                    </div>
            </div>}
            {recipe.length > 0 &&
            <div className="suggested-recipe-container">
                <h2>Chef Claude Recommends:</h2>
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
            }
        </main>
    )
}
