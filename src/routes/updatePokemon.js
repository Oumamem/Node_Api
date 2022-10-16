const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
        where: { id : id}
    })
      .then(_=> {
        return Pokemon.findByPk(id).then(pokemon =>{
            if(pokemon=== null){
                message= "le pokemon n'existe pas",
                res.status(404).json({message, data: error})
            }
            const message = 'Le pokemon a bien été mis à jour.'
            res.json({ message, data: pokemon})
        }) 
                
      })
      .catch(error => {
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})        
        }
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message: error.message, data: error})
        }
        message= `le pokemon ne peut pas être modifié pour le moment, réessayez plustard `,
        res.status(500).json({message, data: error})
      })
  })
}