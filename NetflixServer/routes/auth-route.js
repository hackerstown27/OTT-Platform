const express = require("express");
const router = express.Router();
const User = require("../schema/user-schema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  const usersCount = await User.find({ email: req.body.email }).count();
  if (usersCount >= 1) {
    return res.status(401).send("User Already Exist!");
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    email: req.body.email,
    password: req.body.password,
    watchList: {},
    wishList: {},
  });
  await user.save();

  const token = jwt.sign({ token_id: user._id }, process.env.JWT_PVT_KEY);

  return res
    .header("x-auth-token", token)
    .status(200)
    .send("Account Created Successfully!");
});

router.post("/login", async (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send("User Does Not Exist!");
  }

  const isAuth = await bcrypt.compare(req.body.password, user.password);

  if (!isAuth)
    return res.status(401).send("Username Or Password Did Not Match!");

  const token = jwt.sign({ token_id: user._id }, process.env.JWT_PVT_KEY);

  return res
    .header("x-auth-token", token)
    .status(200)
    .send("Logged In Successfully!");
});

module.exports = router;
