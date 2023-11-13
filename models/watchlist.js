import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    mediaType:Number,
    id:Number,
    comment:String
});

const Watchlist = mongoose.model('watchlist', schema);

export default Watchlist;