const express = require("express");

const routes = express.Router();

routes.put("/signup");

routes.post("/login");

module.exports = routes;
