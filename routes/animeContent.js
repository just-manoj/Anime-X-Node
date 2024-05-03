const express = require("express");

const router = express.Router();

const animeContentController = require("../controllers/animeContent");
const { isAuth } = require("../middleware/is-auth");

router.get("/banner", isAuth, animeContentController.getBanner);

router.get("/listAll", isAuth, animeContentController.getAllContent);

router.put("/user/WishList", isAuth, animeContentController.changeWishList);

// router.get("/user/WishList", isAuth, animeContentController.changeWishList);

router.get(
  "/category/:category/:animeName",
  isAuth,
  animeContentController.getAnimeDetails
);

router.put("/user/FavList", isAuth, animeContentController.changeFavList);

router.get("/user/FavList", isAuth, animeContentController.getFavList);

router.get(
  "/category/:category/:animeName/episodes",
  isAuth,
  animeContentController.getAnimeEpisodes
); //must send query params like ?season=1&&

router.get(
  "/category/:category/:animeName/seasons",
  isAuth,
  animeContentController.getAnimeNoOfSeason
);

module.exports = router;
