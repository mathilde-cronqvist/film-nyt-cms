const db = require('../config/database')();

module.exports = function(app){
    app.get('/', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.menu`, function (err, results) {
            if(err) res.send(err);
            res.render('page', {title : '', 'results' : results});
        })
       
    });
}