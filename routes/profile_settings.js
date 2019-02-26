const db = require('../config/database')();

module.exports = function(app){
    app.use('/profile/settings', (req, res, next) => {
        if(!req.session.user){
            res.redirect('/login');
            return;
        }else{
            next(); 
        }
    });

    app.get('/profile/settings', (req, res, next) => {
        db.query(`SELECT users.username AS username, profiles.firstname AS firstname, profiles.lastname AS lastname, profiles.bio AS bio, profiles.user_id AS userid, users.id AS id, users.roles_id AS userrole
        FROM profiles
        INNER JOIN users
        ON profiles.user_id = users.id WHERE users.id = ?;`, [req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:15:5)`);
			console.log(results)
            res.render('profile_settings', {'title' : 'Profil', 'results' : results[0]});
        })
    })

    app.patch('/profile/settings', (req, res, next) => {
        db.query(`UPDATE profiles SET firstname =?, lastname =?, bio = ? WHERE user_id = ?`, [req.fields.firstname, req.fields.lastname, req.fields.bio, req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:23:5)`);
            res.status(204);
			res.end();
        })
    });

}