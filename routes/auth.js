var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

var config = require('../config');

exports.init = function(router) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new SteamStrategy({
            returnURL: config.hostname + ':' + config.port + config.steam.auth_callback,
            realm: config.hostname + ':' + config.port,
            profile: false
        },
        function(identifier, profile, done) {
            process.nextTick(function() {
                return done(null, {
                    id: identifier.substr(identifier.lastIndexOf('/')).split('/')[1]
                });
            });
        }
    ));

    router.use(passport.initialize());
    router.use(passport.session());

    router.get(config.steam.auth_adress,
        passport.authenticate('steam', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/');
        }
    );

    router.get(config.steam.auth_callback,
        passport.authenticate('steam', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/');
        }
    );

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
