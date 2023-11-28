import jwt from 'jsonwebtoken';
import config from "config";

function verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    res.locals.user = null;
    if(!token) return res.redirect(401, '/login');
    const decoded = jwt.verify(token, config.get('jwt_private_key'));
    if(!decoded) return res.status(400).render('auth/error', {code:400});
    res.locals.user = decoded;
    next();
}

export default verifyToken;