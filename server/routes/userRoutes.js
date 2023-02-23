const express = require("express");
const router = express.Router();

const {
  registerUser,
  signinUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);

router.post("/signin", signinUser);

router.get("/me", protect, getUser);

module.exports = router;
