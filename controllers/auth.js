const bcrypto = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

exports.postSignUp = async (req, res, next) => {
  const { name, email, password, birthDayDate } = req.body || {};

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("Mail Id already Exists");
      throw error;
    }

    const cryptoPassword = await bcrypto.hash(password, 12);

    const user = new User({
      name: name,
      email: email,
      password: cryptoPassword,
      birthDay: birthDayDate,
      wishList: [],
      favList: [],
    });

    const createUser = await user.save();

    const token = jwt.sign(
      {
        email: email,
        userId: createUser._id.toString(),
      },
      "topsecrettokenforanimex",
      { expiresIn: "5h" }
    );

    res.status(201).json({
      message: "user created successfully",
      status: "success",
      token: token,
      userId: createUser._id,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.postLogIn = async (req, res, next) => {
  const { email, password } = req.body || {};
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const error = new Error("Mail Id doesn't Exists");
      throw error;
    }
    const passwordMatch = await bcrypto.compare(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      const error = new Error("Incorrect password");
      throw error;
    }

    const token = jwt.sign(
      {
        email: email,
        userId: existingUser._id.toString(),
      },
      "topsecrettokenforanimex",
      { expiresIn: "5h" }
    );

    res.status(201).json({
      message: "user Login successfully",
      status: "success",
      token: token,
      userId: existingUser._id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.getOTP = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Mail Id doesn't Exists");
      throw error;
    }
    // buna kmde skzj ftph
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const cryptoOTP = await bcrypto.hash(otp.toString(), 12);
    user.otp.otpString = cryptoOTP;
    user.otp.time = new Date();
    user.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "verify.animex@gmail.com",
        pass: "buna kmde skzj ftph",
        name: "Anime X",
      },
    });

    var mailOptions = {
      from: "verify.animex@gmail.com",
      to: user.email,
      subject: "Anime X OTT - Mail Verification",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Anime X OTT - Mail Verification</title>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>AnimeX OTT - Mail Verification</h2>
          <p>Dear User,</p>
          <p>You're receiving this email to verify your email address for Anime X OTT. Please use the OTP provided below to complete the verification process:</p>
          <p>OTP: <strong>${otp}</strong></p>
          <p>This OTP is valid for 15 minutes only.</p>
          <p><strong>Important:</strong> Please do not share this email or OTP with anyone. It's meant for your use only.</p>
          <p>If you didn't request this email, you can safely ignore it.</p>
          <p>Thank you for using Anime X OTT!</p>
          <hr>
          <p style="font-size: 0.8em; color: #777;">This email was sent automatically. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      message: "OTP send successfully",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { otp } = req.body || {};
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Mail Id doesn't Exists");
      throw error;
    }

    const otpTime = new Date(user.otp.time).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - otpTime;

    if (timeDifference <= 15 * 60 * 1000) {
      const isValid = await bcrypto.compare(otp, user.otp.otpString);
      if (isValid) {
        user.emailVerified = isValid;
        user.save();
        res.status(201).json({
          message: "OTP Verified successfully",
          status: "success",
        });
      } else {
        res.status(400).json({
          message: "Invalid OTP",
          status: "failed",
        });
      }
    } else {
      res.status(400).json({
        message: "Time Out",
        status: "failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.getOTPToMail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Mail Id doesn't Exists");
      throw error;
    }
    // buna kmde skzj ftph
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const cryptoOTP = await bcrypto.hash(otp.toString(), 12);
    user.otp.otpString = cryptoOTP;
    user.otp.time = new Date();
    user.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "verify.animex@gmail.com",
        pass: "buna kmde skzj ftph",
        name: "Anime X",
      },
    });

    var mailOptions = {
      from: "verify.animex@gmail.com",
      to: user.email,
      subject: "Anime X OTT - Reset Password",
      html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anime X OTT - Reset Password</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Anime X OTT - Reset Password</h2>
            <p>Dear User,</p>
            <p>You're receiving this email because you requested to reset your password for Anime X OTT. Please use the OTP provided below to reset your password:</p>
            <p>OTP: <strong>${otp}</strong></p>
            <p>This OTP is valid for 15 minutes only.</p>
            <p><strong>Important:</strong> Please do not share this email or OTP with anyone. It's meant for your use only.</p>
            <p>If you didn't request this email, you can safely ignore it.</p>
            <p>Thank you for using Anime X OTT!</p>
            <hr>
            <p style="font-size: 0.8em; color: #777;">This email was sent automatically. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      message: "OTP send successfully",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.verifyOTPFromMail = async (req, res, next) => {
  const { email, otp } = req.body || {};
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Mail Id doesn't Exists");
      throw error;
    }

    const otpTime = new Date(user.otp.time).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - otpTime;

    if (timeDifference <= 15 * 60 * 1000) {
      const isValid = await bcrypto.compare(otp.toString(), user.otp.otpString);
      if (isValid) {
        res.status(201).json({
          message: "OTP Verified successfully",
          status: "success",
        });
      } else {
        res.status(400).json({
          message: "Invalid OTP",
          status: "failed",
        });
      }
    } else {
      res.status(400).json({
        message: "Time Out",
        status: "failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  const { email, password } = req.body || {};
  try {
    const user = await User.findOne({ email: email });
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
