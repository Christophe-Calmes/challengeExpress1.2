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

const postNewUser = (req, res) => {
    const {firstname, lastname, email, city, language} = req.body;
    //console.info(typeof(firstname));
    console.info(lastname);
    console.info(email);
    console.info(city);
    console.info(language);
    database
        .query(
            "INSERT INTO `users`(`firstname`, `lastname`, `email`, `city`, `language`) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language]
        )
        .then(([result]) => {
            res.status(201).send({id: result.insertId});
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    }       
    const updateOneUser = (req, res) => {
        const {firstname,lastname, email, city, language} = req.body;
        const usersSQLUpdate = `UPDATE users SET firstname=?,lastname=?, email=?, city=?, language=? WHERE id=${parseInt(req.params.id)}`;
        database
        .query(usersSQLUpdate, [firstname,lastname, email, city, language])
        .then(([result]) => {
            res.sendStatus(204);
          
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
            
          });
    }
    const delUser = (req, res) => {
        database
            .query("DELETE FROM users WHERE id = ?", [parseInt(req.params.id)])
            .then(([result]) => {
                res.sendStatut(204)
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(404);
            })
    }
    
module.exports = {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateOneUser,
    delUser
}