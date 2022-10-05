const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
        const pokemonDeleted = pokemon;
        Pokemon.destroy({
            where: { id : pokemon.id}
        })
        .then(_=> {
            const message =` Le pokemon ${pokemonDeleted.id} a été bien supprimé.`
            res.json({ message, data: pokemonDeleted })
        })
        
      })
  })
}