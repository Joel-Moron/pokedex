import { getEvolutionData } from './GetEvolutionsData'

const formatStats = (stats) => {
    const nameTypes = {
        hp:'HP',
        attack: 'ATK',
        defense: 'DEF',
        'special-attack': 'SPA',
        'special-defense': 'SpD',
        speed: 'SPD'
    };

    const newStats = stats.map(({ stat, base_stat }) => ({
        name: nameTypes[stat.name],
        base_stat:base_stat
    }))

    newStats.push({
        name:'TOT',
        base_stat: newStats.reduce((acc, stat) => stat.base_stat + acc, 0)
    })

    return newStats
}

const formatTypes = (types) => types.map((type) => type.type.name);

const formatAbilities = (abilities) => abilities.map((abilitie) => abilitie.ability.name);

const getPokemonDescription = (pokemonSpecie) => pokemonSpecie.flavor_text_entries[1].flavor_text;

const getPokemonImage = (sprites) => {
    return (
        sprites.versions['generation-v']['black-white'].animated.front_default ??
        sprites.versions['generation-v']['black-white'].front_default
    )
}

const getEvolutions = async (evolutionInfo) => {
    let evolutions = [];
    let evolutionData = evolutionInfo.chain

    do{
        const evoDetail = evolutionData["evolution_details"][0]
        evolutions.push({
            name: evolutionData.species.name,
            min_level: evoDetail?.min_level ?? 1
        })

        evolutionData = evolutionData.evolves_to[0]
    }while(evolutionData);

    const promises = getEvolutionData(evolutions);

    try {
        const responses = await Promise.allSettled(promises)
        assignInfoToEvolutions(responses, evolutions)
    } catch (error) {
        console.log(error)
    }

    return evolutions
};

const assignInfoToEvolutions = (responses, evolutions) => {
    responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
            evolutions[index].image = response.value.data.sprites.versions['generation-v']['black-white'].front_default;
            evolutions[index].pokemonInfo = response.value.data
        }
    })
}

export {
    formatStats, 
    formatTypes, 
    formatAbilities, 
    getPokemonDescription,
    getEvolutions,
    getPokemonImage
};