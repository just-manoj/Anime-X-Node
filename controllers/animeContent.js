const { CORRENT_IP, CORRENT_PORT } = require("../util/Domain");

const Banner = require("../models/Banner");
const Category = require("../models/Category");
const Episode = require("../models/Episode");
const Anime = require("../models/Anime");
const User = require("../models/User");

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

exports.getAnimeDetails = async (req, res) => {
  const { category, animeName } = req.params || {};
  const { userId } = req.body || {};

  try {
    const cat = await Category.findOne({ name: category });
    const selectedAnimeDetails = await Anime.findOne({
      Category: cat._id,
      name: animeName,
    });

    const name = selectedAnimeDetails.name;
    const description = selectedAnimeDetails.description;
    const noOfSeason = selectedAnimeDetails.noOfSeasons;
    const noOfEpisodes = selectedAnimeDetails.episodeList.length;
    const promoUrl = `http://${CORRENT_IP}:${CORRENT_PORT + 1}${
      selectedAnimeDetails.promoUrl
    }`;
    const posterUrl = `http://${CORRENT_IP}:${CORRENT_PORT + 1}${
      selectedAnimeDetails.posterUrl
    }`;
    const rating = selectedAnimeDetails.rating;
    const studio = selectedAnimeDetails.studio;
    const user = await User.findById(req.userId);
    const isInWishlist = user.wishList.includes(selectedAnimeDetails._id);

    res.status(200).json({
      id: selectedAnimeDetails._id,
      name: name,
      description: description,
      category: category,
      noOfSeason: noOfSeason,
      noOfEpisodes: noOfEpisodes,
      promoUrl: promoUrl,
      posterUrl: posterUrl,
      rating: rating,
      studio: studio,
      isInWishlist: isInWishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
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
  const { category, animeName } = req.params || {};
  const { season } = req.query || {};

  try {
    const cat = await Category.findOne({ name: category });
    const user = await User.findById(req.userId);
    // const isInWishlist = user.wishList.includes(selectedAnimeDetails._id);
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

      if (episode === null) {
        continue;
      }

      episodesList.push({
        ...episode._doc,
        thumnailUrl: `http://${CORRENT_IP}:${CORRENT_PORT + 1}${
          episode.thumnailUrl
        }`,
        videoUrl: `http://${CORRENT_IP}:${CORRENT_PORT + 1}${episode.videoUrl}`,
        isInFavList: user.favList.includes(episode._id),
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

exports.changeWishList = async (req, res, next) => {
  const { animeId } = req.body || {};

  try {
    const user = await User.findById(req.userId);
    let status = "";

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.wishList.includes(animeId)) {
      user.wishList = user.wishList.filter(
        (existingAnimeId) => existingAnimeId != animeId
      );
      status = "removed from";
    } else {
      user.wishList.push(animeId);
      status = "added to";
    }

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      message: `Anime ${status} Wishlist`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.changeFavList = async (req, res, next) => {
  const { episodeId } = req.body || {};

  try {
    const user = await User.findById(req.userId);
    let status = "";

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.favList.includes(episodeId)) {
      user.favList = user.favList.filter(
        (existingEpisodeId) => existingEpisodeId != episodeId
      );
      status = "removed from";
    } else {
      user.favList.push(episodeId);
      status = "added to";
    }

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      message: `Anime ${status} favList`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getFavList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const favEpisodes = [];
    let status = "";

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    for (let index = 0; index < user.favList.length; index++) {
      const episodeId = user.favList[index];
      const episode = await Episode.findById(episodeId);
      const anime = await Anime.findById(episode.anime);
      favEpisodes.push({
        ...episode.toObject(),
        thumnailUrl: `http://${CORRENT_IP}:${CORRENT_PORT + 1}${
          episode.thumnailUrl
        }`,
        videoUrl: `http://${CORRENT_IP}:${CORRENT_PORT + 1}${episode.videoUrl}`,
        isInFavList: true,
        anime: anime.name,
      });
    }
    const updatedUser = await user.save();
    res.status(200).json({
      status: "success",
      favList: favEpisodes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
