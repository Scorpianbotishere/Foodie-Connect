const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const expressasynchandler = require("express-async-handler");
const registerUser = expressasynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all of the fields ");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
  if (!user) {
    res.status(400);
    throw new Error("Erro while Registering");
  }
});

const signinUser = expressasynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill all of the fields ");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken({ id: user._id }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credintails");
  }
});

const getUser = expressasynchandler(async (req, res) => {
  res.json({ message: "User" });
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  signinUser,
  getUser,
};
