const AnimeCover = require("../Sample Data/AnimeCover");
const AnimeEpisode = require("../Sample Data/AnimeEpisode");

exports.getAllContent = (req, res, next) => {
  res.json({
    animeContent: AnimeCover,
  });
};

exports.getBanner = (req, res, next) => {
  res.status(200).json({
    images: [
      "/assets/banner/DeathNoteBanner.png",
      "/assets/banner/BeyBladeBurstBanner.png",
      "/assets/banner/TokyoBanner.png",
      "/assets/banner/ChainsawManBanner.png",
      "/assets/banner/OnePunchManBanner.png",
    ],
  });
};

exports.getAnimeNoOfSeason = (req, res) => {
  const { category, animeName } = req.params || {};

  const episodes = [
    76, 25, 41, 58, 64, 40, 52, 52, 47, 51, 52, 52, 34, 48, 49, 45, 48, 45,
  ];
  res.status(200).json({
    seasons: 18,
    episodes: episodes,
  });
};

exports.getAnimeEpisodes = (req, res) => {
  const { category, animeName } = req.params || {};

  res.status(200).json({
    animeEpisode: AnimeEpisode,
  });
};
