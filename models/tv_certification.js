import mongoose from "mongoose";

const schema = new mongoose.Schema({
    country:String,
    certification:String,
    meaning:String,
    order:Number
});

const TvCertification = mongoose.model('tv_certifications', schema);

export default TvCertification;