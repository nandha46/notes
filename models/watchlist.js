import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    mediaType:Number,
    id: Number,
    movie:{
        type:Number,
        ref: 'movies',
        localField:'id',
        foreignField:'id'
    },
    adult:Boolean,
    priority:Number,
    url:String,
    comment:String
});

const Watchlist = mongoose.model('watchlist', schema);

export default Watchlist;