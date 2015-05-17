var escape = require('escape-html')
var passport = require('passport')
var SteamStrategy = require('passport-steam').Strategy

var config = require('../config')

exports.init = function (router) {

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })

  passport.use(new SteamStrategy({
    returnURL: 'http://' + config.hostname + ':' + config.port + config.steam.auth_callback,
    realm: 'http://' + config.hostname + ':' + config.port,
    apiKey: config.steam.api_key
    // profile: false // if no API key
  }, function (identifier, profile, done) {
    process.nextTick(function () {
        return done(null, {
          id: identifier.substr(identifier.lastIndexOf('/')).split('/')[1],
          name: profile.displayName,
          avatarURL: profile._json.avatar
        })
      })
  }))

  router.use(passport.initialize())
  router.use(passport.session())

  router.get(config.steam.auth_adress,
    passport.authenticate('steam', {
      failureRedirect: '/'
    }),
    function (req, res) {
      res.redirect('/')
    })

  router.get(config.steam.auth_callback,
    passport.authenticate('steam', {
      failureRedirect: '/'
    }),
    function (req, res) {
      res.redirect('/')
    })

  router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  router.get('/auth/check', function (req, res) {
    var ret = {
      steamName: ''
    }
    if (req.isAuthenticated()) {
      ret.steamName = escape(req.session.passport.user.name).trim()
    }
    res.status(200).json(ret)
  })
}
