import mongoose from "mongoose";
const schema = new mongoose.Schema({
    id:Number,
    name:String,
    poster_path:String,
    backdrop_path:String,
    movies:[{type:mongoose.ObjectId, ref:'movies'}]
},{
    timestamps:true
});

const MovieCollection = mongoose.model('movie_collection', schema);

export default MovieCollection;