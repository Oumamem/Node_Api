const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
    .then(user => {
        if(!user){
            message= `Le nom d'utilisateur: ${req.body.username} n'existe pas `
            return res.status(404).json({message})
        }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le password est incorrecte`;
          return res.status(404).json({ message})
        }
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user })
      })
    })
    .catch(error => {
        message= "La connexion n'est pas possible pour le moment",
        res.status(500).json({message, data: error})
      })
  })
}