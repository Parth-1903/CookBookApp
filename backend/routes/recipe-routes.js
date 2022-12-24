import express from "express";
import { addRecipe, deleteRecipe, getAllRecipe, getById, getByUserId, updateRecipe } from "../controllers/recipe-controller";

const recipeRouter = express.Router();

recipeRouter.get('/',getAllRecipe);
recipeRouter.post('/add',addRecipe);
recipeRouter.put('/update/:id',updateRecipe);
recipeRouter.get('/:id',getById);
recipeRouter.delete('/:id',deleteRecipe);
recipeRouter.get("/user/:id",getByUserId)

export default recipeRouter;