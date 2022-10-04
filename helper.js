const pokemons = require("./mock-pockemon")

exports.success = (message, data) => {
    return {message, data}
}
exports.getUniqueID = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon =>pokemon.id)
    const maxId= pokemonsIds.reduce((a,b)=> Math.max(a,b))
    return maxId +1
}