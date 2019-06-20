const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

module.exports = function (app) {
    
    app.use(cookieParser('keyboard cat'));

    app.use(session({
        'resave': false,
        'saveUninitialized': true,
        'secret': 'really secret stuffs'
    }));                                // Setup session handling

    app.use(flash());
};