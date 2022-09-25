const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);
router.post("/changePassword", async (req, res) => {
  const user = res.locals.user;
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  return res.status(200).send("Password Changed Successfully!");
});
router.delete("/deleteUser", async (req, res) => {
  const user = res.locals.user;
  await user.remove();
  return res.status(200).send("Account Deleted Successfully!");
});

module.exports = router;
