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
        db.query(`SELECT users.username, profiles.lastname, profiles.firstname, profiles.bio, users.email FROM profiles 
        INNER JOIN users ON users.id = profiles.id 
        WHERE user_id = ?;`, [req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:15:5)`);
			console.log(results)
            res.render('profile_settings', {'title' : 'Profil', 'results' : results[0]});
        })
    })

    app.patch('/profile/settings', (req, res, next) => {
        db.query(`UPDATE profiles SET firstname =?, lastname =?, email =?, bio = ? WHERE user_id = ?`, [req.fields.fistname, req.fields.lastname, req.fields.email, req.fields.bio, req.session.user], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:23:5)`);
            res.status(204);
			res.end();
        })
    });

}