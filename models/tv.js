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
    genre_ids:[],
    homepage:String,
    origin_country:[],
    original_language:{
        type:String,
    },
    original_name:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    production_companies:[],
    production_countries:[],
    first_air_date:{
        type:Date,
        get: date => date == null?'-':date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    revenue:Number,
    runtime:Number,
    spoken_languages:[],
    status:String,
    tagline:String,
    name:String,
    video:Boolean,
    vote_average:Number,
    vote_count:Number
}, {
    timestamps:true
});

const Tv = mongoose.model('tv_shows', schema);

export default Tv;