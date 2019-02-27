const db = require('../config/database')();

module.exports = function(app){
    app.get('/admin/sider', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.sites;`, function (err, results) {
            if(err) res.send(err);
            res.render('sites_list', {title : 'Administrer sider', 'results' : results});
        })
       
    });
}