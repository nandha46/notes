import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: {
        type:Number,
        unique:true
    },
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection:String,
    budget:Number,
    genres:[],
    homepage:String,
    imdb_id:String,
    original_language:String,
    original_title:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    production_companies:[],
    production_countries:[],
    release_date:Date,
    revenue:Number,
    runtime:Number,
    spoken_languages:[],
    status:String,
    tagline:String,
    title:String,
    video:Boolean,
    vote_average:Number,
    vote_count:Number
});

const Tv = mongoose.model('tv_shows', schema);

export default Tv;