import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name:String
});

const MovieGenre = mongoose.model('movie_genre', schema);

export default MovieGenre;