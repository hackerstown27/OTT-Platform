const express = require("express");
const app = express();
require("dotenv").config();
require("./startup")(app);
const authRouter = require('./routes/auth-route');
const userRouter = require('./routes/user-route');
const courseRouter = require('./routes/course-route');


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/course', courseRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server Started On: ${process.env.PORT}`);
});
