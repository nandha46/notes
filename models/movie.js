import mongoose from 'mongoose';
import iso6391 from 'iso-639-1';

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
    original_language:{
        type:String,
        get: lang => iso6391.getName(lang)
    },
    original_title:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    production_companies:[],
    production_countries:[],
    release_date:{
        type:Date,
        get: date => date == null?'-':date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    },
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

const Movie = mongoose.model('movies', schema);

export default Movie;