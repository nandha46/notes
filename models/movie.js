import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/mongo-test')
            .then(()=> {
                console.log('connected to monogo db');
            }).catch(err => {
                console.error('could not connect to mongo db....');
            });

const schema = new mongoose.Schema({
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection:String,
    budget:Number,
    genres:[],
    homepage:String,
    tmdb_id: Number,
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

const Movie = mongoose.model('movies', schema);

export default Movie;