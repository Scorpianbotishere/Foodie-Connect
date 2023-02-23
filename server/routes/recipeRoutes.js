const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getOneRecipe,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllRecipes);
router.get("/", getOneRecipe);
router.post("/", protect, addNewRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
