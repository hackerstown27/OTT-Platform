const express = require("express");
const app = express();
require("dotenv").config();
require("./startup")(app);
const authRouter = require('./routes/auth-route');

app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Started On: ${process.env.PORT}`);
});
