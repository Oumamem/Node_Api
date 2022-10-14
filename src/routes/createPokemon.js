const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    console.log(req.body)
    Pokemon.create(req.body)
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été mis à jour.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})        
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message: error.message, data: error})
        }
        message= "le pokemon ne peut pas être créer pour le moment, réessayez plustard",
        res.status(500).json({message, data: error})
      })
  })
}