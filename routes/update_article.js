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



    app.get('/rediger_artikel', (req, res, next) =>{
        db.query(`SELECT articles.id, articles.heading, articles.author, users.username, users.id AS userid FROM film_nyt.articles
        INNER JOIN users
        ON articles.author = users.id`, function (err, results){
            if(err) res.send(err);
            res.render('article_list', {title : 'Rediger Artikel', 'results' : results});
        }); 
    });    
    
    app.use('/rediger_artikel/:id', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
			return;
		} else {
			next();
		}
	});

    app.get('/rediger_artikel/:id', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles WHERE id = ?`,[`${req.params.id}`], function (err, results){
            if(err) res.send(err);
            res.render('edit_article', {title : 'Rediger Artikel', 'results' : results[0]});
        });
    }); 

    app.patch('/rediger_artikel/:id', (req, res, next) => {
        const id = req.params.id;
        const heading = req.fields.heading;
		const description = req.fields.description;
		const content = req.fields.content;
        db.query(`UPDATE articles SET heading = ?, description = ?, content = ? WHERE id  = ?`,
            [heading, description, content, id], function (err, results){
                if(err){
                    throw err;
                }
                res.status(200);
                res.end();
        })
    });
    
    app.delete('/rediger_artikel/:id', (req, res, next) => {
        db.query(`DELETE FROM articles WHERE id = ?`, [req.params.id], (err, results) => {
            if(err) throw new Error('Kan ikke slette artikel');

            res.status(200);
            res.end();
        })
    })

 
};