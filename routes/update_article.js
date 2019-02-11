const db = require('../config/database')();

module.exports = function (app){
	app.use('/rediger_artikel', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
			return;
		} else {
			next();
		}
    });
    app.use('/rediger_artikel/:id', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
			return;
		} else {
			next();
		}
	});


    app.get('/rediger_artikel', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles`, function (err, results){
            if(err) res.send(err);
            res.render('edit_article', {title : 'Rediger Artikel', 'results' : results});
        });
    });

    app.get('/rediger_artikel/:id', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles`, function (err, results){
            if(err) res.send(err);
            res.render('new_article', {title : 'Rediger Artikel', 'results' : results});
        });
    });
 
};