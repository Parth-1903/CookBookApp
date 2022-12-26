import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { BACKEND_URL } from "../util";

const FavRecipe = () => {
  const [user, setUser] = useState();
  const [query, setQuery] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${BACKEND_URL}/recipes/fav/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  console.log(user);
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
      {user && user.map((recipes, index) => (
        <Recipe
          id={recipes._id}
          key={index}
          isUser={true}
          title={recipes.title}
          ingredients={recipes.ingredients}
          instruction={recipes.instruction}
          image={recipes.image}
          userName={recipes.user.name}
          flag={false}
        />
      ))}
    </div>
  );
};

export default FavRecipe;
