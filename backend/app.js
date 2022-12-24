import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user-routes";
import recipeRouter from "./routes/recipe-routes";

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/recipes",recipeRouter)
mongoose
  .connect("mongodb://localhost:27017/CookBook")
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to database at Port 5000"))
  .catch((err) => console.log(err));