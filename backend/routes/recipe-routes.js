import express from "express";
import { addLike, addRecipe, deleteLike, deleteRecipe, favourite, getAllRecipe, getById, getByUserId, updateRecipe } from "../controllers/recipe-controller";

const recipeRouter = express.Router();

recipeRouter.get('/',getAllRecipe);
recipeRouter.get('/fav/:id',favourite)
recipeRouter.post('/add',addRecipe);
recipeRouter.put('/update/:id',updateRecipe);
recipeRouter.get('/:id',getById);
recipeRouter.delete('/:id',deleteRecipe);
recipeRouter.get("/user/:id",getByUserId)
recipeRouter.put('/like',addLike)
recipeRouter.put('/dislike',deleteLike)


export default recipeRouter;