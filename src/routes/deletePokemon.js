const auth = require('../auth/auth');
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth,(req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
        if(pokemon=== null){
            message= "le pokemon n'existe pas",
            res.status(404).json({message, data: error})
        }
        const pokemonDeleted = pokemon;
        Pokemon.destroy({
            where: { id : pokemon.id}
        })
        .then(_=> {
            const message =` Le pokemon ${pokemonDeleted.id} a été bien supprimé.`
            res.json({ message, data: pokemonDeleted })
        }) 
      })
      .catch(error => {
        message= "le pokemon ne peut pas être spprimé pour le moment, réessayez plustard",
        res.status(500).json({message, data: error})
      })
  })
}