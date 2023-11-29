import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import _ from 'lodash';
import Joi from 'joi';

import UserExport from '../models/user.js'
const {User, validateUser} = UserExport;

// router.set('view engine', 'ejs');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

   const { error } = validateUser(req.body);

   if(error) return res.status(400).render('auth/register', {err: error.details[0].message});
   
   let user = await User.findOne({email: req.body.email});

   if(user) return res.status(400).render('auth/register', {err: 'User Already Exists'});

   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   const hashedPass = await bcrypt.hash(req.body.password, 10);
   user.password = hashedPass;

   user.save().then(() => {
        res.render('auth/success');
   }).catch(err => {
    res.status(400).render('auth/register', {err: err});
   });

});

router.get('/login', (req, res) => {
    res.render('auth/login', {err:null});
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', "", 10);
    res.send('Logged out');
});

router.post('/login', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        console.error(error.details[0].message);
        return res.status(400).render('auth/login', {err: error.details[0].message});
    }
   
    let user = await User.findOne({email: req.body.email});

    if(!user) 
    {
        console.error('Invalid email or password');
        return res.status(400).render('auth/login', {err: 'Invalid email or password'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) 
    {
        console.error('Invalid email or password');
        return res.status(400).render('auth/login', {err: 'Invalid email or password'});
    }
    
   return res.cookie('jwt', user.generateAuthToken()).redirect(302, '/');
});

router.get('/password-reset', (req, res) => {
    res.render('auth/password-reset');
});

function validate (credentials) {
    const schema = Joi.object({
        email:Joi.string().min(7).max(255).email().required(),
        password:Joi.string().min(8).max(255).required()
    });

    return schema.validate(credentials);
}

export default router;