const db = require('../config/database')();

module.exports = function (app){
    //TODO: 
    app.get('/admin/brugere', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.users`, function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            res.render('admin_users.ejs', {title : 'Brugere', 'results' : results});
        });
    });

    app.get('/admin/brugere/:id', (req, res, next) => {
        db.query(`SELECT * FROM film_nyt.users WHERE id = ?`, [`${req.params.id}`], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            res.render('edit_user', {title : 'Rediger bruger', 'results' : results[0]});
        })
    })

}