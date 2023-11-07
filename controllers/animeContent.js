const AnimeCover = require("../Sample Data/AnimeCover");
const AnimeEpisode = require("../Sample Data/AnimeEpisode");

const Banner = require("../models/Banner");
const Category = require("../models/Category");
const Episode = require("../models/Episode");
const Anime = require("../models/Anime");

exports.getAllContent = async (req, res, next) => {
  const CORRENT_IP = req.ip.substring(7);
  const CORRENT_PORT = req.socket.localPort;
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
          coverImgUrl: `http://${CORRENT_IP}:${CORRENT_PORT}${animeDet.coverImgUrl}`,
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
  const CORRENT_IP = req.ip.substring(7);
  const CORRENT_PORT = req.socket.localPort;

  const banner = await Banner.find();
  const bannerImages = [];

  banner.forEach((b) => {
    bannerImages.push({
      img: `http://${CORRENT_IP}:${CORRENT_PORT}${b.imageUrl}`,
    });
    // bannerImages.push(b.imageUrl);
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

exports.getAnimeEpisodes = async (req, res) => {
  const CORRENT_IP = req.ip.substring(7);
  const CORRENT_PORT = req.socket.localPort;

  const { category, animeName } = req.params || {};
  const { season } = req.query || {};

  try {
    const cat = await Category.findOne({ name: category });

    const selectedAnimeDetails = await Anime.findOne({
      Category: cat._id,
      name: animeName,
    });

    const episodesList = [];

    for (const episodeId of selectedAnimeDetails.episodeList) {
      let episode = await Episode.findOne({
        _id: episodeId,
        noOfSeason: season,
      });

      episodesList.push({
        ...episode._doc,
        thumnailUrl: `http://${CORRENT_IP}:${CORRENT_PORT}${episode.thumnailUrl}`,
        videoUrl: `http://${CORRENT_IP}:${CORRENT_PORT + 1}${episode.videoUrl}`,
      });
    }

    res.status(200).json({
      episodesList: episodesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
