var router = require('express').Router();

var news = require('./news');
var auth = require('./auth');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
// Must be first
auth.init(router);

router.get('/news', news.list);
router.post('/news/new', ensureAuthenticated, news.create);


// catch all
router.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'});
});

module.exports = router;
