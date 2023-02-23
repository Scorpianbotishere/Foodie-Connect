const Recipe = require("../models/recipeModel");
const expressasynchandler = require("express-async-handler");

const getAllRecipes = expressasynchandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user._id });
  res.json(recipes);
  console.log(user);
});
const getOneRecipe = expressasynchandler(async (req, res) => {});
const addNewRecipe = expressasynchandler(async (req, res) => {
  const newRecipe = await Recipe.create({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cookingTime: req.body.cookingTime,
    difficulty: req.body.difficulty,
    servings: req.body.servings,
    image: req.body.image,
    category: req.body.category,
    dietaryRestrictions: req.body.dietaryRestrictions,
    user: req.user._id,
  });
  res.status(201).json(newRecipe);
});
const updateRecipe = expressasynchandler(async (req, res) => {});
const deleteRecipe = expressasynchandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(400);
    throw new Error("Recipe Not Found");
  }
  await recipe.remove();
  res.json({ message: "Removed" });
});

module.exports = {
  getAllRecipes,
  getOneRecipe,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
};
