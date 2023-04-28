const express = require("express");

function setConfig(app) {
  const mongoose = require("mongoose");
  const cors = require("cors");

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: "*",
    exposedHeaders: "*",
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(express.static("public"));

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connected to mongodb ..."))
    .catch(() => console.log("failed to connect with mongodb !"));
}

module.exports = setConfig;
