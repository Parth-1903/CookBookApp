import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { BACKEND_URL } from "../util";

const UserRecipe = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  // const res = await axios
  //   .get(`${BACKEND_URL}/recipes/user/${id}`)
  //   .catch((err) => console.log(err));
  // const data = await res.data;
  // return data;
  const sendRequest = async () => {
    const res = await fetch(`${BACKEND_URL}/recipes/user/${id}`)
    const data = res.json();
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
      {" "}
      {user &&
        user.recipe &&
        user.recipe.map((recipes, index) => (
          <Recipe
            id={recipes._id}
            key={index}
            isUser={true}
            title={recipes.title}
            ingredients={recipes.ingredients}
            instruction={recipes.instruction}
            image={recipes.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserRecipe
