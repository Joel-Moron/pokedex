import axios from "axios"

const getEvolutionData = (evolutions) => {

    return evolutions.map(async(evolution) => await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name}/`))
}

export { getEvolutionData }