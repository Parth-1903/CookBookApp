import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { BACKEND_URL } from "../util";

const Recipes = () => {
  const [recipe,setRecipe] = useState();
  const sendRequest = async () => {
    const res = await fetch(`${BACKEND_URL}/recipes`)
    const data = res.json()
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setRecipe(data.recipe));
  }, []);
  console.log(recipe);
  return (
    <div>
      {recipe &&
        recipe.map((recipe, index) => (
          <Recipe
            key={index}
            id={recipe._id}
            isUser={localStorage.getItem("userId") === recipe.user._id}
            title={recipe.title}
            ingredients={recipe.ingredients}
            instruction={recipe.instruction}
            image={recipe.image}
            userName={recipe.user.name}
          />
        ))}
    </div>
  );
};

export default Recipes;