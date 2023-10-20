const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: String,
  noOfEpisode: Number,
  thumnailUrl: String,
});

module.exports = mongoose.model("Episode", EpisodeSchema);