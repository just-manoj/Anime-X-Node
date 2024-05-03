const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const contentRoute = require("./routes/animeContent");
const userRoute = require("./routes/user");

const MONGODB_CONN = "mongodb://127.0.0.1:27017/animex";

const app = express();

app.use(bodyParser.json());

app.use("/assets", express.static(path.join(__dirname, "assets"))); //access as public folder

app.use("/auth", authRoute);
app.use("/content", contentRoute);
app.use("/user", userRoute);

mongoose
  .connect(MONGODB_CONN)
  .then((result) => {
    console.log("Mongo Db Connected");
  })
  .catch((err) => {
    console.log("Mongo Db DisConnected");
    console.log(err);
  });

app.listen(27940);
console.log("connect");
