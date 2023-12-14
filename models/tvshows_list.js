import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    privacy: String,
    isRanked: Boolean,
    userId: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    tvshows: [
      {
        tvshow: {
          type: mongoose.ObjectId,
          ref: "tv_shows",
        },
        order: Number,
        notes: String,
      },
    ],
    likedBy: [
      {
        type: mongoose.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TvshowList = mongoose.model('tvshow_lists', schema);

export default TvshowList;