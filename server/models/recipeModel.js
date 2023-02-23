const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
    },
    preparation: {
      type: [String],
    },
    cookingTime: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    servings: {
      type: Number,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      enum: ["appetizer", "main course", "dessert"],
    },
    dietaryRestrictions: {
      type: [String],
      enum: ["vegetarian", "gluten-free", "dairy-free"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
