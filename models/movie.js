import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Language from '../models/language.js';

const schema = new mongoose.Schema({
    id: {
        type:Number,
        unique:true
    },
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection:String,
    budget:Number,
    genre_ids:[],
    homepage:String,
    imdb_id:String,
    original_language:{
        type:String,
    },
    original_title:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    poster_downloaded:{type:Boolean, default:false},
    production_companies:[],
    production_countries:[],
    release_date:{
        type:Date,
        get: date => date == null?'-':date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    revenue:Number,
    runtime:Number,
    spoken_languages:[],
    status:String,
    tagline:String,
    title:String,
    video:Boolean,
    vote_average:Number,
    vote_count:Number,
    credits:Schema.Types.Mixed
}, {
    timestamps:true,
    toJSON:{
        virtuals:true, 
        getters:true
    },
    toObject:{
        virtuals:true, 
        getters:true
    }
});

schema.virtual('language', {
    ref:'languages',
    localField:'original_language',
    foreignField:'iso_639_1',
    justOne: true
});

schema.virtual('options').get(function () {

    let content = `<ul class="nk-tb-actions gx-1">
    <li class="nk-tb-action-hidden">
        <a href="#" class="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
            <em class="icon ni ni-wallet-fill"></em>
        </a>
    </li>
    <li class="nk-tb-action-hidden">
        <a href="#" class="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Change to Completed">
            <em class="icon ni ni-mail-fill"></em>
        </a>
    </li>
    <li>
        <div class="drodown">
            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="link-list-opt no-bdr">
                    <li><a href="#"><em class="icon ni ni-eye"></em><span>View Movie Details</span></a></li>
                </ul>
            </div>
        </div>
    </li>
</ul>`;

    return content;

});

const Movie = mongoose.model('movies', schema);

export default Movie;