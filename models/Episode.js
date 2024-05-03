const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: String,
  noOfEpisode: Number,
  thumnailUrl: String,
  noOfSeason: Number,
  anime: {
    type: Schema.Types.ObjectId,
    ref: "Anime",
  },
});

module.exports = mongoose.model("Episode", EpisodeSchema);
