const { Pokemon } = require('../db/sequelize')
const findPokemonById = require('./findPokemonById')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
        Pokemon.findOne({ where: { name: req.query.name } })
        .then(pokemons => {
            const message = `C'est le Pokemon volue nommé : $(req.query.name)`
            res.json({ message, data: pokemons })
          })
    }
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        message= "pas de pokemon pour le moment, réessayez plustard",
        res.status(500).json({message, data: error})
      })
  })
}