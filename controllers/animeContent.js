const AnimeCover = require("../Sample Data/AnimeCover");
const AnimeEpisode = require("../Sample Data/AnimeEpisode");

const Banner = require("../models/Banner");
const Category = require("../models/Category");
const Episode = require("../models/Episode");
const Anime = require("../models/Anime");

exports.getAllContent = async (req, res, next) => {
  try {
    const category = await Category.find();
    const animeContent = [];

    category.forEach((cat) => {
      animeContent.push({
        id: cat._id,
        category: cat.name,
        animeList: [],
      });
    });

    for (let index = 0; index < animeContent.length; index++) {
      const animeCon = animeContent[index];
      const anime = await Anime.find({ Category: animeCon.id });

      anime.forEach((animeDet) => {
        const animeDetails = {
          id: animeDet._id,
          animeName: animeDet.name,
          description: animeDet.description,
          coverImgUrl: animeDet.coverImgUrl,
        };
        animeContent[index].animeList.push(animeDetails);
      });
    }

    res.status(200).json({
      animeContent: animeContent,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getBanner = async (req, res, next) => {
  const banner = await Banner.find();
  const bannerImages = [];

  banner.forEach((b) => {
    bannerImages.push(b.imageUrl);
  });

  res.status(200).json({
    images: bannerImages,
  });
};

exports.getAnimeNoOfSeason = async (req, res) => {
  const { category, animeName } = req.params || {};

  try {
    const cat = await Category.findOne({ name: category });

    const selectedAnimeDetails = await Anime.findOne({
      Category: cat._id,
      name: animeName,
    });

    const noOfSeasons = selectedAnimeDetails.noOfSeasons;
    const noOfEpisodes = Array(noOfSeasons).fill(0);
    for (
      let index = 0;
      index < selectedAnimeDetails.episodeList.length;
      index++
    ) {
      const episodeId = selectedAnimeDetails.episodeList[index];
      const seasonNum = await Episode.findById(episodeId, {
        noOfSeason: 1,
        _id: 0,
      });
      noOfEpisodes[seasonNum.noOfSeason - 1]++;
    }

    res.status(200).json({
      seasons: noOfSeasons,
      episodes: noOfEpisodes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAnimeEpisodes = (req, res) => {
  const { category, animeName } = req.params || {};

  res.status(200).json({
    animeEpisode: AnimeEpisode,
  });
};
