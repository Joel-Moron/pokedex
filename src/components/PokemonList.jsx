import { useContext } from "react";
//CONTEXT
import { PokemonContext } from "../context/PokemonContext";
//COMPONENT
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
    
    const { animationF } = useContext(PokemonContext)

    return(
        <div className="pt-14 grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4 gap-y-14">
            {
                pokemons?.map(pokemon => (
                    <PokemonCard 
                        onClick={animationF}
                        key={pokemon.url || pokemon.pokemon.url} 
                        pokemonURL={pokemon.url || pokemon.pokemon.url}
                    />
                ))
            }
        </div>
    )
}

export default PokemonList;