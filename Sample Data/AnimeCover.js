const { AnimeCover } = require("../models/Anime");

module.exports = SampleAnimeCover = [
  {
    id: 0,
    category: "Kodama",
    list: [
      new AnimeCover(0, "Pokemon", "/assets/Cover/Kodama/PokemonCover.png"),
      new AnimeCover(
        1,
        "BeyBlade Burst",
        "/assets/Cover/Kodama/BeyBladeBurstCover.png"
      ),
      new AnimeCover(2, "PerMan", "/assets/Cover/Kodama/PerManCover.png"),
      new AnimeCover(3, "Doremon", "/assets/Cover/Kodama/DoremonCover.png"),
      new AnimeCover(
        4,
        "Ninja Hatori",
        "/assets/Cover/Kodama/NinjaHatoriCover.png"
      ),
      new AnimeCover(5, "Kiterrtsu", "/assets/Cover/Kodama/KiteretsuCover.png"),
      new AnimeCover(6, "Ultra B", "/assets/Cover/Kodama/UltraBCover.png"),
    ],
  },
  {
    id: 1,
    category: "Shonen",
    list: [
      new AnimeCover(
        0,
        "Death Note",
        "/assets/Cover/Shonen/DeathNoteCover.png"
      ),
      new AnimeCover(
        1,
        "Naruto Classic",
        "/assets/Cover/Shonen/NarutoClassicCover.png"
      ),
      new AnimeCover(
        2,
        "Dragon Ball",
        "/assets/Cover/Shonen/DragonBallCover.png"
      ),
      new AnimeCover(
        3,
        "Attack On Titan",
        "/assets/Cover/Shonen/AttackOnTitanCover.png"
      ),
      new AnimeCover(
        4,
        "Naruto Shippuden",
        "/assets/Cover/Shonen/NarutoShippudenCover.png"
      ),
      new AnimeCover(
        5,
        "DemonSlayer",
        "/assets/Cover/Shonen/DemonSlayerCover.png"
      ),
      new AnimeCover(
        6,
        "DragonBall Z",
        "/assets/Cover/Shonen/DragonBallZCover.png"
      ),
      new AnimeCover(
        7,
        "Chainsaw Man",
        "/assets/Cover/Shonen/ChainSawManCover.png"
      ),
      new AnimeCover(
        8,
        "My Hero Academia",
        "/assets/Cover/Shonen/MyHeroAcademyCover.png"
      ),
      new AnimeCover(9, "One Piece", "/assets/Cover/Shonen/OnePieceCover.png"),
      new AnimeCover(
        10,
        "Hunter X Hunter",
        "/assets/Cover/Shonen/HunterXHunterCover.png"
      ),
    ],
  },
  {
    id: 2,
    category: "Seinen",
    list: [
      new AnimeCover(0, "Lain", "/assets/Cover/Seinen/LainSeinen.png"),
      new AnimeCover(
        1,
        "One Punch Man",
        "/assets/Cover/Seinen/OnePunchManseinen.png"
      ),
      new AnimeCover(
        2,
        "Code Geass",
        "/assets/Cover/Seinen/codeGeassSeinen.png"
      ),
      new AnimeCover(3, "Erased", "/assets/Cover/Seinen/ErasedSeinen.png"),
      new AnimeCover(
        4,
        "Ergo Proxy",
        "/assets/Cover/Seinen/ErgoProxyseinen.png"
      ),
      new AnimeCover(
        5,
        "Ghost In The Shell",
        "/assets/Cover/Seinen/GhostInTheShellSeinen.png"
      ),
      new AnimeCover(
        6,
        "Immortal Blade",
        "/assets/Cover/Seinen/ImmortalBladeSeinen.png"
      ),
      new AnimeCover(7, "Monster", "/assets/Cover/Seinen/Monsterseinen.png"),
      new AnimeCover(
        8,
        "Parasyte Maxim",
        "/assets/Cover/Seinen/ParasyteMaximShonen.png"
      ),
      new AnimeCover(
        9,
        "Psycho Pass",
        "/assets/Cover/Seinen/PsychoPassSeinen.png"
      ),
      new AnimeCover(
        10,
        "Tokyo Ghoul",
        "/assets/Cover/Seinen/TokyoGhoulSeinen.png"
      ),
    ],
  },
];
