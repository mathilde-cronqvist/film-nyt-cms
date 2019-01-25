const db = require('../config/database')();

module.exports = function (app){
    app.get('/news', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles`, function (err, results){
            if(err) res.send(err);
            res.render('feed', {title : '', 'results' : results});
        });
    });
}