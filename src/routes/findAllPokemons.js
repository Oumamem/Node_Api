const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
const auth = require('../auth/auth')
module.exports = (app) => {
  app.get('/api/pokemons', auth ,(req, res) => {
    if(req.query.name){
        const name= req.query.name
        const limit= parseInt(req.query.lim) || 5
        if(name.length < 2){
          message = "longuer n'est pas suffisante"
          return res.status(500).json(message)
        }
        Pokemon.findAndCountAll(
          { where: { 
            name: {
               [Op.like]: `%${name}%`
            } 
          },
          order: ['name'],  
          limit: limit
        })
        .then(({count, rows}) => {
            const message = `la liste des pokemons contenant: ${name}, contient ${count} pokemon(s)`
            res.json({ message, data: rows })
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