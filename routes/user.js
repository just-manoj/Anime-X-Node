const express = require("express");

const { isAuth } = require("../middleware/is-auth");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/getProfile", isAuth, userController.getProfile);

router.put("/changePassword", isAuth, userController.changePassword);

module.exports = router;
