const db = require('../config/database')();

module.exports = function (app){
    //TODO: 



    app.get('/admin/brugere', (req, res, next) =>{
        if(req.session.level == 100){
            db.query(`SELECT * FROM film_nyt.users`, function (err, results){
                if (err) return next(`${err} at db.query (${__filename}:9:5)`);
                res.render('admin_users.ejs', {title : 'Brugere', 'results' : results});
            });

        } else{
            res.send('Du har ikke adgang til denne side');
        }
        
    });

    app.get('/admin/brugere/:id', (req, res, next) => {
        db.query(`SELECT users.username AS username, profiles.firstname AS firstname, profiles.lastname AS lastname, profiles.bio AS bio, profiles.user_id AS userid, users.id AS id, users.roles_id AS userrole
        FROM profiles
        INNER JOIN users
        ON profiles.user_id = users.id
        WHERE users.id = ?`, [req.params.id], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            res.render('edit_user', {title : 'Rediger bruger', 'results' : results[0]});
        })
    })

    app.patch('/admin/brugere/:id', (req, res, next) => {
        const id = req.params.id;
        const firstname = req.fields.firstname;
        const lastname = req.fields.lastname;
        const bio = req.fields.bio;
        const rolename = req.fields.role;
        db.query(`UPDATE profile SET firstname = ?, lastname = ?, bio = ?, rolename = ? WHERE id  = ?;`, [firstname, lastname, bio, rolename, id], function(err, results){
            if(err){
                throw err;
            }
            res.status(200);
            res.end();
        })
    })

    app.delete('/admin/brugere/:id', (req, res, next) => {
        db.query(`DELETE FROM users WHERE id = ?`, [req.params.id], (err, results) => {
            if(err) throw new Error('Kan ikke slette bruger');

            res.status(200);
            res.end();
        })
    })

}