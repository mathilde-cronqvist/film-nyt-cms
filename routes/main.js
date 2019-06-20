const db = require('../config/database')();

module.exports = function(app){
    app.get('/', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.articles
        ORDER BY RAND()
        LIMIT 2;`, function (err, results) { 
            db.query(`SELECT * FROM film_nyt.menu;`, function(err, menu) {
                if(err) res.send(err);
                res.render('page', {title : '', 'results' : results,'menu' : menu });
            });
        });
       

       
    });


}