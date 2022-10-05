const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const app = express()
const port = 3000

//dev est utilisé pour optimiser l'affichage à la phase de dev et de déboggage 
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonById')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
app.listen(port, () => console.log('Notre application Nodejs démarrre ! '))

