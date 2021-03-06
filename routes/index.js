var router = require('express').Router();

var auth = require('./auth');
var news = require('./news');
var events = require('./events');

var ADMIN_STEAM_IDS = require('../config').admin_ids;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).end();
}

function ensureAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).end();
}

// Must be first
auth.init(router);

//router.get('/news', news.list);
//router.post('/news/new', ensureAuthenticated, news.create);

router.get('/event/:eventId', events.findOne);
router.get('/events/list', events.list);
router.post('/events/create-new', events.create);
router.post('/upload/event-img', events.uploadImage);
router.post('/upload/event-sqm', events.uploadSqmFile);

// catch all 
router.get('*', function(req, res) {
    res.sendFile('index.html', {
        root: 'public'
    });
});

module.exports = router;