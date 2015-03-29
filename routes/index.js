var router = require('express').Router();

var news = require('./news');
var auth = require('./auth');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//router.get('/news', news.list);
//router.post('/news/new', ensureAuthenticated, news.create);

auth.init(router);

// catch all
router.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'});
});

module.exports = router;
