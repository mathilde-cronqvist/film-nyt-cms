 const db = require('../config/database')();

module.exports = function(app){
    app.get('/admin/sider', (req, res, next) =>{
        if(req.session.level == 100){
            db.query(`SELECT * FROM film_nyt.sites;`, function (err, results) {
                if(err) res.send(err);
                res.render('sites_list', {title : 'Administrer sider', 'results' : results});
            })
        }else{
            res.send('Hov hov! Du har ikke adgang til denne side');
        }

       
    });
}