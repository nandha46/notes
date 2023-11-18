import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name:String
});

const movieGenre = mongoose.model('movie_genre', schema);

export default movieGenre;