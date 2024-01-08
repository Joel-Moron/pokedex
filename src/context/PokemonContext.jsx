import { useState } from "react";
import { createContext } from "react";
import {formatStats, formatTypes, formatAbilities, getPokemonDescription, getEvolutions, getPokemonImage} from "../services/FormatPokemon";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({children}) => {
    const [filters, setFilters] = useState({
        types:[],
        order:false,
        name:''
    });
    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemonsByFilters, setPokemonsByFilters] = useState([]);

    const [animation, setAnimation] = useState(false)
    const [consult, setConsult] = useState(false)
    const [pokemonDetail, setPokemonDetail] = useState(false);
    const [showFilterPokemon, setShowFilterPokemon] = useState(false);
    const [showDetailPokemon, setShowDetailPokemon] = useState(false);

    const showPokemon = async (pokemonInfo) => {
        const {data: dataSpecies} = await axios.get(pokemonInfo.species.url)
        const {data: dataEvolution} = await axios.get(dataSpecies.evolution_chain.url)
        const {id, name, height, weight, stats, types, abilities} = pokemonInfo;
        const evolutions = await getEvolutions(dataEvolution);
        setPokemonDetail({
            id,
            name,
            height,
            weight,
            stats: formatStats(stats),
            types: formatTypes(types),
            abilities: formatAbilities(abilities),
            description: getPokemonDescription(dataSpecies),
            evolutions,
            image: getPokemonImage(pokemonInfo.sprites)
        });
        setShowDetailPokemon(true);
    }

    const closePokemonDetail = () => {
        setShowDetailPokemon(false);
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    //animation for consult pokemon
    const animationF = async (pokemon) => {
        if (!consult) {
            setAnimation(true);
            setConsult(true);
            await delay(500);
            await showPokemon(pokemon);
            setAnimation(false);
            await delay(500);
            setConsult(false);
        }
    }

    return (
        <PokemonContext.Provider
            value={{
                setShowFilterPokemon,
                showFilterPokemon,
                showDetailPokemon,
                showPokemon,
                closePokemonDetail,
                pokemonDetail,
                animationF,
                animation,
                setAnimation,
                filters,
                setFilters,
                allPokemons,
                setAllPokemons,
                pokemonsByFilters,
                setPokemonsByFilters
            }}
        >
            {children}
        </PokemonContext.Provider>
    )
}

export { PokemonContext, PokemonProvider };