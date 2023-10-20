const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  name: String,
  description: String,
  coverImgUrl: String,
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  noOfSeasons: Number,
  episodoList: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
});

module.exports = mongoose.model("Anime", AnimeSchema);
