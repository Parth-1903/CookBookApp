import Recipe from "../models/Recipe";
import User from "../models/User";

export const getAllRecipe = async (req, res) => {
  let recipe;
  try {
    recipe = await Recipe.find().populate("user");
  } catch (err) {
    return res.status(400).json({ message: "internal server error" });
  }

  if (!recipe) {
    return res.status(404).json({ message: "No Receipe Found" });
  }
  return res.status(200).json({ recipe });
};

export const addRecipe = async (req, res) => {
  const { title, ingredients, instruction, image, user } = req.body;
  let checkUser;
  try {
    checkUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }

  if (!checkUser) {
    return res.status(400).json({ message: "Unable to find By UserId" });
  }
  const recipes = new Recipe({
    title,
    ingredients,
    instruction,
    image,
    user,
  });

  try {
    await recipes.save();
    checkUser.recipe.push(recipes);
    await checkUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ recipes });
};

export const updateRecipe = async (req, res) => {
  const { title, ingredients, instruction, image } = req.body;
  const recipeId = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.findByIdAndUpdate(recipeId, {
      title,
      ingredients,
      instruction,
      image,
    });
  } catch (err) {
    console.log(err);
  }

  if (!recipe) {
    return res.status(500).json({ message: "Unable to update the Recipe" });
  }
  return res.status(200).json({ recipe });
};

export const getById = async (req, res) => {
  const id = req.params.id;
  let recipes;
  try {
    recipes = await Recipe.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!recipes) {
    return res.status(404).json({ message: "No Recipe Found" });
  }
  return res.status(200).json({ recipes });
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  let deleteRecipe;
  try {
    deleteRecipe = await Recipe.findByIdAndDelete(id).populate("user");
    await deleteRecipe.user.recipe.pull(deleteRecipe);
    await deleteRecipe.user.save();
  } catch (err) {
    console.log(err);
  }

  if (!deleteRecipe) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userRecipe;
  try {
    userRecipe = await User.findById(userId).populate("recipe");
  } catch (err) {
    console.log(err);
  }
  if (!userRecipe) {
    return res.status(404).json({ message: "No Blog App" });
  }
  return res.status(200).json({ user: userRecipe });
};

export const addLike = async (req, res) => {
  try {
    const id = req.body.id;
    const userId = req.body.userId;
    let data = await User.findById(userId);
    if (data.likes.includes(id)) {
      throw new Error("")
    }
    console.log(data);
    data.likes.push(id);
    await data.save();
    res.json(data);
  } catch (error) {
    return res.status(400).json({ message: "Already Liked" });
  }
};

export const deleteLike = async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  let data = await User.findById(userId);
  console.log(id);
  console.log(data);
  data.likes.pull(id);
  await data.save();
  res.json(data);
};

export const favourite = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let data = await User.findById(id)
    .populate("likes")
    .populate({
      path: "likes",
      populate: {
        path: "user",
        select: "name",
      },
    });
  console.log(data.likes);
  res.json(data.likes);
};
