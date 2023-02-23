const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv").config();
const connection = require("./config/config");
const app = express();
const port = process.env.PORT || 5001;
const { errorHandler } = require("./middlewares/errorHandler");

connection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/recipeRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
