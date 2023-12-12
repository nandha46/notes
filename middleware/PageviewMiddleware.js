import Pageview from '../models/pageview.js'

function storePageview(req, res, next){
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const pageview = new Pageview({
        ip:ip,
        page:req.path
    });    
    pageview.save().then(()=> {
        next();
    }).catch(err => {
        console.error(err);
        next();
    });
}

export default storePageview;