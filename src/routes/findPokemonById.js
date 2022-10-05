const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
      Pokemon.findByPk(req.params.id)
        .then(pokemons => {
          const message = 'Un Pokemon est trouvé'
          res.json({ message, data: pokemons })
        })
    })
  }