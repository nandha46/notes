import mongoose from "mongoose";

const schema = new mongoose.Schema({
    ip:String,
    page:String,
    timestamp:{
        type:Date,
        default:Date.now()
    }
});

const Pageview = mongoose.model('pageview', schema);

export default Pageview;