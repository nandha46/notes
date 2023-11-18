import mongoose from "mongoose";

const schema = new mongoose.Schema({
    adult:Boolean,
    also_known_as:[],
    biography:String,
    birthday:Date,
    gender:Number,
    homepage:String,
    id:Number,
    imdb_id:String,
    known_for_department:String,
    name:String,
    place_of_birth:String,
    popularity:Number,
    profile_path:String,
    external_ids:{},
    movie_credits:{},
    tv_credits:{}

});