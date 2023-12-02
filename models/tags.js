import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String, 
        unique:true
    },
    popularity:{
        type:Number, 
        default:0
    }
});

const Tags = mongoose.model('tags', schema);

export default Tags;