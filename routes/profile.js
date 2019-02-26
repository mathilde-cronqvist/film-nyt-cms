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
        db.query(`SELECT users.username AS username, profiles.firstname AS firstname, profiles.lastname AS lastname, profiles.bio AS bio, profiles.user_id AS userid, users.id AS id, users.roles_id AS userrole
        FROM profiles
        INNER JOIN users
        ON profiles.user_id = users.id WHERE users.id = ?;`, [req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:15:5)`);
			console.log(results)
            res.render('profile', {'title' : 'Profil', user : results[0]});
        })
    })

}