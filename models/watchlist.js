import mongoose from 'mongoose';
import Joi from 'joi';

const schema = new mongoose.Schema({
    mediaType:Number,
    id: Number,
    adult:Boolean,
    priority:Number,
    url:String,
    comment:String,
    tags:[ {type:mongoose.Schema.Types.ObjectId, ref:'tags'} ],
    completed:{
        type:Boolean,
        default:false
    }
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});

schema.virtual('movie', {
    ref:'movies',
    localField:'id',
    foreignField:'id'
});

schema.virtual('tvshow', {
    ref:'tv_shows',
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
        tags:Joi.array(),
        completed:Joi.boolean(),
        movArr: Joi.array().required(),
        tvArr: Joi.array().required()
    });

   return schema.validate(watchlist);
}
export default {validateWatchlist, Watchlist};