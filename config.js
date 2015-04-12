module.exports = {

    hostname: 'localhost',
    port: 8080,
    mongoURI: 'mongodb://localhost/fparma',
    cookie_secret: 'derp',
    admin_ids: [],
    steam: {
    	api_key: 'woop',
        auth_adress: '/auth/steam',
        auth_callback: '/auth/steam/callback'
    }
};
