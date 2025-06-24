

const system_prompt = `
You are an assistant that receives a list of ingredients that a user has and 
suggests a recipe they could make with some or all of those ingredients. You don't need to use 
every ingredient they mention in your recipe. The recipe can include additional ingredients they
didn't mention, but try not to include too many extra ingredients. Format your respone in markdown
to make it easier to render to a webpage.
`

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

console.log(apiKey);

export async function getRecipeFromMistral(ingredientsArr){
    const ingredientString = ingredientsArr.join(", ");

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model : "llama-3.3-70b-versatile",
            messages : [
                {role: "system", content: system_prompt},
                {role : "user", content: `I have ${ingredientString}. Please give me a recipe`}
            ],
            max_tokens : 1024
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}


