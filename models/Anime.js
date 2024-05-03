const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  name: String,
  description: String,
  coverImgUrl: String,
  promoUrl: String,
  posterUrl: String,
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  noOfSeasons: Number,
  rating: Number,
  studio: String,
  episodeList: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
});

module.exports = mongoose.model("Anime", AnimeSchema);
