const express = require("express");

const authController = require("../controllers/auth");

const routes = express.Router();

routes.post("/signup", authController.postSignUp);

routes.post("/login", authController.postLogIn);

module.exports = routes;
