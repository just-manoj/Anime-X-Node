const express = require("express");

const authController = require("../controllers/auth");
const { isAuth } = require("../middleware/is-auth");

const routes = express.Router();

routes.post("/signup", authController.postSignUp);

routes.post("/login", authController.postLogIn);

routes.get("/isAuth", isAuth);

routes.get("/mailVerify", isAuth, authController.getOTP);

routes.post("/mailVerify", isAuth, authController.verifyOTP);

routes.post("/reset-password/getMail", authController.getOTPToMail);

routes.post("/reset-password/verifyMail", authController.verifyOTPFromMail);

routes.put("/reset-password", authController.changePassword);

module.exports = routes;
