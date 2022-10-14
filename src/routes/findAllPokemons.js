const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
        const name= req.query.name
        Pokemon.findAll(
          { where: { 
            name: {
               [Op.like]: `%${name}%`
            } 
          },
          limit : 2
    })
        .then(pokemons => {
            const message = `C'est le Pokemon voulu nommé : ${name}`
            res.json({ message, data: pokemons })
          })
    }else{
        Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        message= "pas de pokemon pour le moment, réessayez plustard",
        res.status(500).json({message, data: error})
      })
    }
    
  })
}