import mongoose from 'mongoose';
import Joi from 'joi';

const schema = new mongoose.Schema({
    mediaType:Number,
    id: Number,
    adult:Boolean,
    priority:Number,
    url:String,
    comment:String,
    completed:{
        type:Boolean,
        default:false
    }
}, {
    toJSON:{virtuals:false},
    toObject:{virtuals:true},
    timestamps:true
});

schema.virtual('movie', {
    ref:'movies',
    localField:'id',
    foreignField:'id'
});

const Watchlist = mongoose.model('watchlist', schema);

function validateWatchlist (watchlist) {
    const schema = Joi.object({
        mediaType: Joi.number().required(),
        selectedTitle: Joi.number().required(),
        adult:Joi.boolean(),
        priority:Joi.number(),
        url:Joi.string().allow(''),
        comment: Joi.string().allow(''),
        completed:Joi.boolean(),
        movArr: Joi.array().required(),
        tvArr: Joi.array().required()
    });

   return schema.validate(watchlist);
}
export default {validateWatchlist, Watchlist};