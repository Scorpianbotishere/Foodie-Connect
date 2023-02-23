const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timeseries: true }
);
module.exports = mongoose.model("User", userSchema);
