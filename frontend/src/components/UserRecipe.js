import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { BACKEND_URL } from "../util";

const UserRecipe = () => {
  const [user, setUser] = useState();
  const [query, setQuery] = useState("");
  const id = localStorage.getItem("userId");
  // const res = await axios
  //   .get(`${BACKEND_URL}/recipes/user/${id}`)
  //   .catch((err) => console.log(err));
  // const data = await res.data;
  // return data;
  const sendRequest = async () => {
    const res = await fetch(`${BACKEND_URL}/recipes/user/${id}`);
    const data = res.json();
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
    console.log("This is my Recipes");
  }, [user]);
  
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
      </form>{" "}
      {user &&
        user.recipe &&
        user.recipe.filter((recipe)=>recipe.title.toLowerCase().includes(query)).map((recipes, index) => (
          <Recipe
            id={recipes._id}
            key={index}
            isUser={true}
            title={recipes.title}
            ingredients={recipes.ingredients}
            instruction={recipes.instruction}
            image={recipes.image}
            userName={user.name}
            flag={true}
          />
        ))}
    </div>
  );
};

export default UserRecipe;
