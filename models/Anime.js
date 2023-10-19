exports.AnimeCover = class AnimeCover {
  constructor(id, animeName, coverImgUrl) {
    this.id = id;
    this.animeName = animeName;
    this.coverImgUrl = coverImgUrl;
  }
};

exports.AnimeEpisode = class AnimeEpisode {
  constructor(id, episodeNo, episodeName, episodeImageUrl, desc, timing) {
    this.id = id;
    this.episodeNo = episodeNo;
    this.episodeName = episodeName;
    this.episodeImageUrl = episodeImageUrl;
    this.desc = desc;
    this.timing = timing;
  }
};
