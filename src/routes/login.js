const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
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
          return res.status(401).json({ message})
        }
        console.log(privateKey);
        //Géneration de jeton JWT avec la méthode sign : (params: ID, la clé, la durée)
        const token = jwt.sign(
          {userId: user.id},
          'heheheh',
          { expiresIn: '24h'}
        )
        console.log(token)
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
        message= "La connexion n'est pas possible pour le moment",
        res.status(500).json({message, data: error})
      })
  })
}