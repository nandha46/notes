import mongoose from "mongoose";

const schema = new mongoose.Schema({
    iso_639_1:{
        type:String,
        unique:true
    },
    english_name:String,
    name:String
});

const Language = mongoose.model('languages', schema);

export default Language;