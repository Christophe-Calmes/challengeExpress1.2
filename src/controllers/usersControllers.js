const database = require("../../database");
const getAllUsers = (req, res) => {
    database
    .query("SELECT `id`, `firstname`, `lastname`, `email`, `city`, `language` FROM `users` ")
    .then(([users]) => {
        res.json(users);
        res.status(200);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
}
const getOneUser = (req, res) => {

    const usersSQLSelect = `SELECT id, firstname, lastname, email, city, language FROM users WHERE id=${parseInt(req.params.id)}`;
  
   

    database
    .query(usersSQLSelect)
    .then(([oneUser]) => {
        if(parseInt(req.params.id) !=0) {
            res.json(oneUser);
            res.status(200);
        } else {
            res.status(404)
            res.sendStatus("no user");
        }
    
       
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(404);
    })
}
module.exports = {
    getAllUsers,
    getOneUser
}