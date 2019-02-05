const db = require('../config/database')();
const bcrypt = require('bcryptjs');

module.exports = function (app){

	console.log(bcrypt.hashSync('1234', 10));
    app.get('/login', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			console.log("bad badcredentials");
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('login', { title: 'Log ind' });
	} );

	app.post('/auth/login', (req, res, next) => {
			db.query('SELECT id FROM film_nyt.users WHERE username = ? AND passphrase = ?', [req.fields.username, req.fields.passphrase], (err, result) => {
				console.log([req.fields.username, req.fields.passphrase]);
				console.log(result[0]);
				if (err) return next(`${err} at db.query (${__filename}:9:5)`);
				if (result.length !== 1) {
					res.redirect('/login?status=badcredentials');
					return;
				}
				if(bcrypt.compareSync(req.body.passphrase, result.users.passphrase)){
					req.session.user = result[0].id;
					res.redirect('/profile');
				}
				
			});
	});

	app.get('/auth/logout', (req, res, next) => {
		req.session.destroy();
		res.redirect('/');
	});
	
	app.get('/opret', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			console.log("bad badcredentials");
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('opret', { title: 'Opret bruger' });
	})

	app.post('/auth/opret', (req, res, next) => {
			console.log("signup commencing");
			db.query(`INSERT INTO film_nyt.users (username, email, passphrase)
								VALUES (?, ?, ?) `, [req.fields.username, req.fields.email, req.fields.passphrase], (err, results) => {
			res.redirect('/profile');
			});
	});

	

}