const db = require('../config/database')();

module.exports = function(app){
    app.use('/user/artikler', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
			return;
		} else {
			next();
		}
	});

    app.get('/user/artikler', (req, res, next) =>{
        db.query(`SELECT articles.heading, articles.description, articles.id FROM film_nyt.articles 
        WHERE author = ?;`, [req.session.user], function (err, results) {
            if(err) res.send(err);
            res.render('user_articles', {title : 'Dine artikler', 'results' : results});
        })
       
    });
}