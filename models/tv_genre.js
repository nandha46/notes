import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name:String
});

const TvGenre = mongoose.model('tv_genre', schema);

export default TvGenre;