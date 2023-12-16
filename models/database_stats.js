import mongoose from "mongoose";
const schema = new mongoose.Schema({
    collection_name:String,
    Date:{
        type:Date,
        default:Date.now
    },
    records:Number
});

const DatabaseStats = mongoose.model('database_stats', schema);

export default DatabaseStats;