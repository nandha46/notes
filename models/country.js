import mongoose from "mongoose";

const schema = new mongoose.Schema({
    iso_3166_1:{
        type:String,
        unique:true
},
    english_name:String,
    native_name:String
});

const Country = mongoose.model('countries', schema);

export default Country;