const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Course = require("../schema/course-schema");

router.use(authMiddleware);

router.post("/courses/watch", async (req, res) => {
  const user = res.locals.user;
  user.watchList.set(req.body.id, true);
  await user.save();
  return res.status(200);
});

router.delete("/courses/watch/:id", async (req, res) => {
  const user = res.locals.user;
  user.watchList.set(req.params.id, undefined);
  user.historyList.set(req.params.id, req.body.rating);
  await user.save();
  return res.status(200);
});

router.post("/courses/bookmark", async (req, res) => {
  const user = res.locals.user;
  user.wishList.set(req.body.id, true);
  await user.save();
  return res.status(200);
});

router.delete("/courses/bookmark/:id", async (req, res) => {
  const user = res.locals.user;
  user.wishList.set(req.params.id, undefined);
  await user.save();
  return res.status(200);
});

router.get("/courses", async (req, res) => {
  const user = res.locals.user;
  let output = {};
  const watchList = [];
  for (const item in user.watchList.toJSON()) {
    const watchedCourse = await Course.findById(item).lean();
    watchedCourse.watching = true;
    watchList.push(watchedCourse);
  }

  const wishList = [];
  for (const item in user.wishList.toJSON()) {
    const wishedCourse = await Course.findById(item).lean();
    wishedCourse.marked = true;
    wishList.push(wishedCourse);
  }

  output["Continue Watching"] = watchList;
  output["Your WishList"] = wishList;
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
