import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import Auth from "./components/Auth";
import Header from "./components/Header";
import RecipeDetail from "./components/RecipeDetail";
import Recipes from "./components/Recipes";
import UserRecipe from "./components/UserRecipe";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch])
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/add" element={<AddRecipe />} />
              <Route path="/myRecipes" element={<UserRecipe />} />
              <Route path="/myRecipes/:id" element={<RecipeDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
