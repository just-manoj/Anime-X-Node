const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const contentRoute = require("./routes/animeContent");

const app = express();

app.use(bodyParser.json());

// app.use("/assets", express.static(path.join(__dirname, "assets"))); //access as public folder

app.use("/auth", authRoute);
app.use("/content", contentRoute);

app.listen(27940);
console.log("connect");
