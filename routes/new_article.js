const db = require('../config/database')();

module.exports = function (app){
	app.use('/ny_artikel', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
			return;
		} else {
			next();
		}
	});

    app.get('/ny_artikel', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles`, function (err, results){
            if(err) res.send(err);
            res.render('new_article', {title : 'Opret Artikel', 'results' : results});
        });
    });
    app.post('/ny_artikel', (req, res) => {
		db.query(`INSERT INTO articles SET heading =?,  description = ?, content =?`, [req.fields.heading, req.fields.description, req.fields.content], function(err, results){
            if(err) throw err;
			res.redirect('/profile');
	    });
    });

};