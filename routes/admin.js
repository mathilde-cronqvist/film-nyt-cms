const db = require('../config/database')();

module.exports = function(app){
    app.use('/admin', (req, res, next) => {
        if(!req.session.user){
            res.redirect('/login');
            return;
        }else{
            next(); 
        }
    });

    app.get('/admin', (req, res) => {
        db.query(`SELECT * FROM film_nyt.users;`, [req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:15:5)`);
			console.log(results)
            res.render('admin', {'title' : 'Admin', 'results' : results});
        })
    })

}