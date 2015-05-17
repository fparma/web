var config = {
  hostname: 'localhost',
  port: 8080,
  mongoURI: 'mongodb://localhost/fparma',
  cookie_secret: 'secret',
  admin_ids: [],
  steam: {
   api_key: 'secret',
   auth_adress: '/auth/steam',
   auth_callback: '/auth/steam/callback'
 }
}

module.exports = exports = config