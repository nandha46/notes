import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String, 
        unique:true
    },
});

const Tags = mongoose.model('tags', schema);

export default Tags;