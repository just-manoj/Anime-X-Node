const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  wishList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Anime",
    },
  ],
  favList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
    },
  ],
  emailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  otp: {
    otpString: {
      type: String,
      required: false,
    },
    time: {
      type: Date,
      required: false,
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
