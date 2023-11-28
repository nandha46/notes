import mongoose from "mongoose";
import Joi from 'joi';
import jwt from "jsonwebtoken";
import config from 'config';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:7,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:255,
    },
    profile:{
        type:String,
        default:'a-sm.jpg'
    },
    isAdmin:{type:Boolean, default:false},
    roles:[],
    operations:[]

}, {
    timestamps:true
});

schema.methods.generateAuthToken = function () {
   return jwt.sign({_id:this._id, isAdmin:this.isAdmin, name:this.name, profile:this.profile, email:this.email}, config.get('jwt_private_key'));
}

function validateUser(user) {
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(7).max(255).email().required(),
        password:Joi.string().min(8).max(255).required()
    });

    return schema.validate(user);
}

const User = mongoose.model('users', schema);

export default {User, validateUser};