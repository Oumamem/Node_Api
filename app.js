const express = require('express')
let pokemons = require('./mock-pockemon')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const {Sequelize} = require('sequelize')
//appeler seulement la fonction succes du fichier helper : affectation destructurée
const { success, getUniqueID } = require('./helper.js')
const app = express()
const port = 3000

//dev est utilisé pour optimiser l'affichage à la phase de dev et de déboggage 
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

const sequelize = new Sequelize(
    'pokedex', 
    'root', 
    'root', 
    {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
});

sequelize.authenticate()
    .then(_=>console.log('la connexion à la BD a été établie'))
    .catch(error => console.error(`la connexion a été échouée ${error}`))

//Créer une route express =app.METHODEHTTP(CHEMIN, GESTIONNAIRE(req,res))
app.get('/', (req,res) => res.send('Hello, Express'))

//id est le parametre
app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req,res)=>{
    const message = 'Toute la liste'
    res.json(success(message, pokemons))
})

app.post('/api/pokemons',(req,res)=>{
    const id= getUniqueID(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message= 'pokemon ajouté'
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: id} 
    pokemons= pokemons.map( pokemon =>{
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = 'update réussie'
    res.json(success(message,pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message ='pokemon deleted'
    res.json(success(message, pokemonDeleted))     
})

app.listen(port, () => console.log('Notre application Nodejs démarrre ! '))

