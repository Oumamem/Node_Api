const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
      Pokemon.findByPk(req.params.id)
        .then(pokemons => {
            if(pokemon=== null){
                message= "le pokemon n'existe pas",
                res.status(404).json({message, data: error})
            }
            const message = 'Un Pokemon est trouvé'
            res.json({ message, data: pokemons })
        })
        .catch(error => {
            message= "le pokemon n'existe pas",
            res.status(500).json({message, data: error})
          })
    })
  }