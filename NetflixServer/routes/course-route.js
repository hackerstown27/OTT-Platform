const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Course = require("../schema/course-schema");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "ap-south-1",
});

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      if (file.mimetype.includes("image"))
        cb(null, "thumbnails/" + Date.now() + "-" + file.originalname);
      else if (file.mimetype.includes("video"))
        cb(null, "videos/" + Date.now() + "-" + file.originalname);
    },
  }),
});

router.use(authMiddleware);

router.put(
  "/courses/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.files);
    let course = new Course({
      name: req.body.courseName,
      thumbnail: req.files.thumbnail[0].location,
      tag: req.body.courseCategory,
      videoSrc: req.files.video[0].location,
    });
    await course.save();
  }
);

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
