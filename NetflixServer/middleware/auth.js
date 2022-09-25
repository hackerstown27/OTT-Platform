const User = require("../schema/user-schema");
var jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const userId = jwt.verify(
      req.headers.authorization,
      process.env.JWT_PVT_KEY
    ).token_id;
    const user = await User.findById(userId);
    if (!user) res.status(401).send("Please Re-login, You are unauthorized !");
    else {
        res.locals.user = user;
        next();
    }
  } catch (e) {
    res.status(401).send("Please Re-login, You are unauthorized !");
  }
};
