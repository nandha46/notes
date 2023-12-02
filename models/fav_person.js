import mongoose from "mongoose";
import Movie from './movie.js';
import Tv from './tv.js';
import Person from "./person.js";

const schema = new mongoose.Schema({
    person:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Person',
        unique:true
    },
    isFavourite:Boolean,
    rating:{
        type:Number, 
        default:0
    },
    tags:[{ 
        type:mongoose.ObjectId, 
        ref:'Tags' 
    }],
    comment:String,
    known_movie:[{
        type:mongoose.ObjectId,
        ref:'Movie'
    }],
    known_tv:[{
        type:mongoose.ObjectId,
        ref:'Tv'
    }]
},{
    timestamps:true
});

const FavPerson = mongoose.model('fav_persons', schema);

export default FavPerson;