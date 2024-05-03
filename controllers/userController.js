const bcrypto = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(201).json({
      profile: user,
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  const { password } = req.body || {};
  console.log(req.body);
  try {
    const user = await User.findById(req.userId);
    const cryptoPassword = await bcrypto.hash(password, 12);
    user.password = cryptoPassword;
    user.save();

    res.status(201).json({
      message: "Password Chanaged Successfully",
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};
