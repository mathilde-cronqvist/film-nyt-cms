const db = require('../config/database')();

module.exports = function (app){
    app.get('/brugere', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.users`, function (err, results){
            if(err) res.send(err);
            res.render('admin_users.ejs', {title : '', 'results' : results});
        });
    });
}