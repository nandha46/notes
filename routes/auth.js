import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import _ from 'lodash';

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

   if(!user) return res.status(400).render('auth/register', {err: 'User Already Exists'});

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
    res.render('auth/login');
});

router.get('/password-reset', (req, res) => {
    res.render('auth/password-reset');
});

export default router;