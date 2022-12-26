import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { BACKEND_URL } from "../util";

const Recipes = () => {
  const [recipe, setRecipe] = useState();
  const [query, setQuery] = useState("");
  const [user,setUser] = useState()
  const id = localStorage.getItem('userId')
  const sendRequest = async () => {
    const res = await fetch(`${BACKEND_URL}/recipes`);
    const data = res.json();
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setRecipe(data.recipe));
    fetch(`${BACKEND_URL}/recipes/user/${id}`).then((res)=>res.json()).then((data)=>setUser(data))
  }, []);

  // console.log(recipe.filter(getRecipe=>getRecipe.title.toLowerCase().includes('fe')));
  return (
    <div>
      <form class="search-container">
        <input
          id="search-box"
          type="text"
          class="search-box"
          name="q"
          onChange={(e) => setQuery(e.target.value)}
        />
        <label for="search-box">
          <span class="fa fa-search" style={{ marginLeft: "-1.8rem" }}></span>
        </label>
        <input type="submit" id="search-submit" />
      </form>
      {/* <input type="text" placeholder="Search..." className="search" onChange={(e)=>setQuery(e.target.value)} /> */}
      {recipe &&
        recipe
          .filter((user) => user.title.toLowerCase().includes(query))
          .map((recipe, index) => (
            <Recipe
              key={index}
              id={recipe._id}
              isUser={localStorage.getItem("userId") === recipe.user._id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              instruction={recipe.instruction}
              image={recipe.image}
              userName={recipe.user.name}
              flag={false}

            />
          ))}
    </div>
  );
};

export default Recipes;
