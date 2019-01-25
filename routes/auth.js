const db = require('../config/database')();

module.exports = function (app){
    app.get('/login', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			console.log("bad badcredentials");
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('login', { title: 'Log ind' });
	});

	app.post('/auth/login', (req, res, next) => {
			db.query('SELECT id FROM film_nyt.users WHERE username = ? AND passphrase = ?', [req.fields.username, req.fields.passphrase], (err, result) => {
				console.log([req.fields.username, req.fields.passphrase]);
				console.log(result[0]);
				if (err) return next(`${err} at db.query (${__filename}:9:5)`);
				if (result.length !== 1) {
					res.redirect('/login?status=badcredentials');
					return;
				}
				req.session.user = result[0].id;
				res.redirect('/admin');
			});
	});

	app.get('/auth/logout', (req, res, next) => {
		req.session.destroy();
		res.redirect('/');
	});
	

}