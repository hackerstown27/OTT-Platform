const express = require('express');
const router = express.Router();
const User = require("../schema/user-schema");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
    const usersCount = await User.find({ email: req.body.email }).count();
    if (usersCount >= 1) {
        return res.status(401).send("User Already Exist!");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    let user = new User({ email: req.body.email, password: req.body.password });
    await user.save();

    const token = jwt.sign(
        { token_id: user._id },
        process.env.JWT_PVT_KEY
    );

    return res.header("x-auth-token", token)
        .status(200)
        .send("Account Created Successfully!");
});

module.exports = router;