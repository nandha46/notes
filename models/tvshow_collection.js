import mongoose from "mongoose";
const schema = new mongoose.Schema({
    id:Number,
    name:String,
    poster_path:String,
    backdrop_path:String,
    tvshows:[{type:mongoose.ObjectId, ref:'tv_shows'}]
},{
    timestamps:true
});

const TvshowCollection = mongoose.model('tvshow_collection', schema);

export default TvshowCollection;