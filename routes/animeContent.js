const express = require("express");

const router = express.Router();

const animeContentController = require("../controllers/animeContent");

router.get("/listAll", animeContentController.getAllContent);

router.get("/banner", animeContentController.getBanner);

router.get("/category/:category");

router.get("/category/:category/:animeName");

router.get("/category/:category/:animeName/seasons");

router.get("/category/:category/:animeName/episodes"); //must send query params like ?season=1&&

module.exports = router;
