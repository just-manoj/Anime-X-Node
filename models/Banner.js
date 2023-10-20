const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
