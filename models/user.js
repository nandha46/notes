import mongoose from "mongoose";
import Joi from 'joi';

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
        unique:true
    },

}, {
    timestamps:true
});

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