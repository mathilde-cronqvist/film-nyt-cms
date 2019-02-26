const db = require('../config/database')();

module.exports = function (app){
    //TODO: 
    app.get('/admin/brugere', (req, res, next) =>{
        db.query(`SELECT * FROM film_nyt.users`, function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            res.render('admin_users.ejs', {title : 'Brugere', 'results' : results});
        });
    });

    app.get('/admin/brugere/:id', (req, res, next) => {
        db.query(`SELECT users.username, profiles.lastname, profiles.firstname, profiles.bio FROM profiles 
        INNER JOIN users ON users.id = profiles.id
        WHERE user_id = ?`, [req.params.id], function (err, results){
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            res.render('edit_user', {title : 'Rediger bruger', 'results' : results[0]});
        })
    })

    app.patch('/admin/brugere/:id', (req, res, next) => {
        const id = req.params.id;
        const firstname = req.fields.firstname;
        const lastname = req.fields.lastname;
        const bio = req.fields.bio;
        db.query(`UPDATE profiles SET firstname =?, lastname =?, bio =? WHERE user_id =?`, [firstname, lastname, bio, id], function(err, results){
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