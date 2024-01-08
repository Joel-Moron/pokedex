import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {pokemonTypesColor} from "../services/pokemonTypes";

const PokemonCard = ({ pokemonURL, onClick }) => {

    const [pokemon, setPokemon] = useState(null)

    //Get Pokemon
    useEffect(() => {
        axios.get(pokemonURL)
            .then(({ data }) => {
                setPokemon(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <div className="text-center bg-white rounded-[30px] relative font-semibold capitalize pb-4 shadow-lg shadow-slate-400/10 
            border-2 border-transparent hover:border-slate-200 cursor-pointer group grid gap-2"
            onClick={() => onClick(pokemon)}
        >
            <header className="h-8">
                <img
                    className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 group-hover:scale-110 transition-transform pixelated"
                    src={pokemon?.sprites.versions["generation-v"]["black-white"].front_default} 
                    alt="" 
                />
            </header>
            <span className="text-sm text-slate-400">N° {pokemon?.id}</span>
            <h4 className="text-lg">{pokemon?.name}</h4>
            <ul className="flex gap-2 justify-center">
                {
                    pokemon?.types.map((type) => (
                        <li 
                            className={` p-1 rounded-md px-2 text-sm text-white ${pokemonTypesColor[type.type.name] || 'bg-slate-500'}`}
                            key={type.type.name}
                        >
                            {type.type.name}
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}

export default PokemonCard;