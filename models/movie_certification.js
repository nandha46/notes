import mongoose from "mongoose";

const schema = new mongoose.Schema({
    country:String,
    certification:String,
    meaning:String,
    order:Number
});

const MovieCertification = mongoose.model('movie_certifications', schema);

export default MovieCertification;