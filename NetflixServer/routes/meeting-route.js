const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
const Meeting = require("../schema/meeting-schema");
const moment = require("moment-timezone");
router.use(authMiddleware);

function addMinutes(date, minutes) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
  return dateCopy;
}

router.post("/", async (req, res) => {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: new Date().getTime() + 5000,
  };
  const token = jwt.sign(payload, process.env.ZOOM_API_Secret);
  email = "tarunaws6@gmail.com";
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: req.body.topic,
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };

  requestPromise(options)
    .then(async function (response) {
      let meeting = new Meeting({
        topic: response.topic,
        timezone: "Asia/Kolkata",
        created_at: moment.tz(response.created_at, "Asia/Kolkata"),
        start_url: response.start_url,
        join_url: response.join_url,
        expire_at: addMinutes(
          new Date(moment.tz(response.created_at, "Asia/Kolkata")),
          40
        ),
      });
      await meeting.save();
      return res.status(200).send(meeting);
    })
    .catch(function (err) {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get("/", async (req, res) => {
  const meetings = await Meeting.find(
    { expire_at: { $gt: moment.tz(new Date(), "Asia/Kolkata") } },
    ["topic", "join_url"]
  );
  return res.status(200).send(meetings);
});

module.exports = router;
