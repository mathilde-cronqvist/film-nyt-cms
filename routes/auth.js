const db = require('../config/database')();
const bcrypt = require('bcryptjs');

module.exports = function (app){
    app.get('/login', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			console.log("bad badcredentials");
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('login', { title: 'Log ind' });
	} );

	app.post('/auth/login', (req, res, next) => {
			db.query('SELECT id, passphrase FROM film_nyt.users WHERE username = ?', [req.fields.username], (err, result) => {
				if (err) return next(`${err} at db.query (${__filename}:9:5)`);
				if (bcrypt.compareSync(req.fields.passphrase, result[0].passphrase)) {
					req.session.user = result[0].id;
					app.locals.login = true;

					res.redirect('/profile');
				}else{
					res.redirect('/login?status=badcredentials');
					return;
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
			let success = true;
			if(success){
				let hashPassphrase = bcrypt.hashSync(req.fields.passphrase, 10);
				db.query(`INSERT INTO film_nyt.users (username, email, passphrase, roles_id)
								VALUES (?, ?, ?, 3) `, [req.fields.username, req.fields.email, hashPassphrase], (err, results) => {
			
				res.redirect('/login');
				});
			}else{
				res.render('opret', {title: 'fejl'})
			}
			
	});

	console.log(bcrypt.hashSync('1234', 10));

}