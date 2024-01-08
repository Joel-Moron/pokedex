import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
export default function FiltersPokemons(pokemons) {

    const { filters } = useContext(PokemonContext)

    const filteredPokemons = () => {
        let filteredPoke = pokemons?.filter(pokemon => filters.name ? pokemon?.name?.includes(filters.name) : true);
        //console.log(filteredPoke);
    
        if (filteredPoke && filteredPoke.length > 0) {
            if (filters?.order === 'DESC') {
                filteredPoke.sort((a, b) => b.name.localeCompare(a.name));
            } else if (filters?.order === 'ASC') {
                filteredPoke.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
    
        return filteredPoke;
    }
    
    return {
        filteredPokemons
    }
}

