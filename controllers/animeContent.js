const AnimeCover = require("../models/Anime");
// const SampleAnimeCover = [
//   {
//     id: 0,
//     category: "Kodama",
//     list: [
//       new AnimeCover(
//         0,
//         "Pokemon"
//         // require("../../assets/Cover/Kodama/PokemonCover.png")
//       ),
//       new AnimeCover(
//         1,
//         "BeyBlade Burst"
//         // require("../../assets/Cover/Kodama/BeyBladeBurstCover.png")
//       ),
//       new AnimeCover(
//         2,
//         "PerMan"
//         // require("../../assets/Cover/Kodama/PerManCover.png")
//       ),
//       new AnimeCover(
//         3,
//         "Doremon"
//         // require("../../assets/Cover/Kodama/DoremonCover.png")
//       ),
//       new AnimeCover(
//         4,
//         "Ninja Hatori"
//         // require("../../assets/Cover/Kodama/NinjaHatoriCover.png")
//       ),
//       new AnimeCover(
//         5,
//         "Kiterrtsu"
//         // require("../../assets/Cover/Kodama/KiteretsuCover.png")
//       ),
//       new AnimeCover(
//         6,
//         "Ultra B"
//         // require("../../assets/Cover/Kodama/UltraBCover.png")
//       ),
//     ],
//   },
//   {
//     id: 1,
//     category: "Shonen",
//     list: [
//       new AnimeCover(
//         0,
//         "Death Note"
//         // require("../../assets/Cover/Shonen/DeathNoteCover.png")
//       ),
//       new AnimeCover(
//         1,
//         "Naruto Classic"
//         // require("../../assets/Cover/Shonen/NarutoClassicCover.png")
//       ),
//       new AnimeCover(
//         2,
//         "Dragon Ball"
//         // require("../../assets/Cover/Shonen/DragonBallCover.png")
//       ),
//       new AnimeCover(
//         3,
//         "Attack On Titan"
//         // require("../../assets/Cover/Shonen/AttackOnTitanCover.png")
//       ),
//       new AnimeCover(
//         4,
//         "Naruto Shippuden"
//         // require("../../assets/Cover/Shonen/NarutoShippudenCover.png")
//       ),
//       new AnimeCover(
//         5,
//         "DemonSlayer"
//         // require("../../assets/Cover/Shonen/DemonSlayerCover.png")
//       ),
//       new AnimeCover(
//         6,
//         "DragonBall Z"
//         // require("../../assets/Cover/Shonen/DragonBallZCover.png")
//       ),
//       new AnimeCover(
//         7,
//         "Chainsaw Man"
//         // require("../../assets/Cover/Shonen/ChainSawManCover.png")
//       ),
//       new AnimeCover(
//         8,
//         "My Hero Academia"
//         // require("../../assets/Cover/Shonen/MyHeroAcademyCover.png")
//       ),
//       new AnimeCover(
//         9,
//         "One Piece"
//         // require("../../assets/Cover/Shonen/OnePieceCover.png")
//       ),
//       new AnimeCover(
//         10,
//         "Hunter X Hunter"
//         // require("../../assets/Cover/Shonen/HunterXHunterCover.png")
//       ),
//     ],
//   },
//   {
//     id: 2,
//     category: "Seinen",
//     list: [
//       new AnimeCover(
//         0,
//         "Lain"
//         // require("../../assets/Cover/Seinen/LainSeinen.png")
//       ),
//       new AnimeCover(
//         1,
//         "One Punch Man"
//         // require("../../assets/Cover/Seinen/OnePunchManseinen.png")
//       ),
//       new AnimeCover(
//         2,
//         "Code Geass"
//         // require("../../assets/Cover/Seinen/codeGeassSeinen.png")
//       ),
//       new AnimeCover(
//         3,
//         "Erased"
//         // require("../../assets/Cover/Seinen/ErasedSeinen.png")
//       ),
//       new AnimeCover(
//         4,
//         "Ergo Proxy"
//         // require("../../assets/Cover/Seinen/ErgoProxyseinen.png")
//       ),
//       new AnimeCover(
//         5,
//         "Ghost In The Shell"
//         // require("../../assets/Cover/Seinen/GhostInTheShellSeinen.png")
//       ),
//       new AnimeCover(
//         6,
//         "Immortal Blade"
//         // require("../../assets/Cover/Seinen/ImmortalBladeSeinen.png")
//       ),
//       new AnimeCover(
//         7,
//         "Monster"
//         // require("../../assets/Cover/Seinen/Monsterseinen.png")
//       ),
//       new AnimeCover(
//         8,
//         "Parasyte Maxim"
//         // require("../../assets/Cover/Seinen/ParasyteMaximShonen.png")
//       ),
//       new AnimeCover(
//         9,
//         "Psycho Pass"
//         // require("../../assets/Cover/Seinen/PsychoPassSeinen.png")
//       ),
//       new AnimeCover(
//         10,
//         "Tokyo Ghoul"
//         // require("../../assets/Cover/Seinen/TokyoGhoulSeinen.png")
//       ),
//     ],
//   },
// ];

exports.getAllContent = (req, res, next) => {
  res.json({
    animeContent: "SampleAnimeCover",
  });
};

exports.getBanner = (req, res, next) => {
  res.status(200).json({
    images: [
      "/assets/banner/TokyoBanner.png",
      "/assets/banner/BeyBladeBurstBanner.png",
      "/assets/banner/ChainsawManBanner.png",
      "/assets/banner/DeathNoteBanner.png",
      "/assets/banner/OnePunchManBanner.png",
    ],
  });
};
