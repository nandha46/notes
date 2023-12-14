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
    movies: [
      {
        movie: {
          type: mongoose.ObjectId,
          ref: "movies",
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

const MovieList = mongoose.model('movie_lists', schema);

export default MovieList;