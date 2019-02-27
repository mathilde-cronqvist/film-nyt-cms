const db = require('../config/database')();
// const fs = require('fs');

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
    app.patch('/profile/settings/image', (req, res, next) => {
        if(!req.files || !req.files.photo){
            return next(`File not found (${__filename}:29:5)`);
        }

        const file = req.file.photo;
        const renamedFilename = `${Date.now()}_${__filename}`;

        fs.readFile(file.path, (err, data) =>{
            if (err) return next(`${err} at fs.readFile (${__filename}:35:5)`);
            fs.writeFile(`./public/uploads/${renamedFilename}`, data, err => {
                if (err) return next(`${err} at fs.writeFile (${__filename}:37:7)`);
				db.query('INSERT INTO photos SET name = ?', [renamedFilename], (err, result) => {
                    if (err) return next(`${err} at db.query (${__filename}:39:9)`);
					db.query('UPDATE profiles SET photos_id = ? WHERE users_id = ?', [result.insertId, req.session.user], (err, result) => {
                        if (err) return next(`${err} at db.query (${__filename}:41:11)`);
						res.status(200);
						res.json({
							photo: renamedFilename
						});
                    });
                });
            });
        });
    })

}