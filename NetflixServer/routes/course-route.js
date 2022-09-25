const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Course = require("../schema/course-schema");

router.use(authMiddleware);
router.get("/courses", async (req, res) => {
  let output = {};
  const tags = await Course.find().select({ tag: 1 }).distinct("tag");
  for (let tag of tags) {
    output[tag] = await Course.find({ tag: tag });
  }
  return res.status(200).send(output);
});

router.get("/courses/:query", async (req, res) => {
  let output = {};
  const tags = await Course.find().select({ tag: 1 }).distinct("tag");
  for (let tag of tags) {
    const courses = await Course.find({
      name: { $regex: ".*" + req.params.query + ".*" },
      tag: tag,
    });
    if (courses.length != 0) output[tag] = courses;
  }
  return res.status(200).send(output);
});

module.exports = router;
