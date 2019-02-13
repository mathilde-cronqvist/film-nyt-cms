const db = require('../config/database')();

module.exports = function(app){
    app.use('/profile', (req, res, next) => {
        if(!req.session.user){
            res.redirect('/login');
            return;
        }else{
            next(); 
        }
    });

    app.get('/profile', (req, res, next) => {
        db.query(`SELECT users.username, profiles.lastname, profiles.firstname, profiles.bio FROM profiles 
        INNER JOIN users ON users.id = profiles.id 
        WHERE user_id = ?;`, [req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:15:5)`);
			console.log(results)
            res.render('profile', {'title' : 'Profil', user : results[0]});
        })
    })

}