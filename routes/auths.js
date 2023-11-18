import express from 'express';
const router = express.Router();

// router.set('view engine', 'ejs');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/password-reset', (req, res) => {
    res.render('auth/password-reset');
});

export default router;