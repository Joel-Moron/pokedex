import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export default function ServicesCrud(SetMethod) {
    
    const { filters } = useContext(PokemonContext)

    const [data, setData] = useState([])

    const getAllPokemons = async () => {
        await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000")
        .then(({data}) =>{
            setData(data.results);
            SetMethod && SetMethod(data.results)
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    const getTypesPokemons = async (type) => {
        let dataFormat = []
        await axios.get(`https://pokeapi.co/api/v2/type/${type}?limit=2000`)
        .then(({data}) =>{
                dataFormat = data.pokemon.map(pokemon => {
                    return {
                        name : pokemon.pokemon.name,
                        url : pokemon.pokemon.url
                    }
                })
                /* setData(dataFormat);
                SetMethod && SetMethod(dataFormat); */
            })
        .catch((error) =>{
            console.log(error);
        })
        return dataFormat
    }

    const eliminarDuplicados = (array, propiedad = 'name') => {
        const seen = new Set();
        return array.filter((item) => {
          const valor = item[propiedad];
          if (!seen.has(valor)) {
            seen.add(valor);
            return true;
          }
          return false;
        });
      }

    const GroupPokemons = () => {
        let groupPokemons = []
        filters?.types?.forEach((type, index) => {
            getTypesPokemons(type)
            .then((response) =>{
                groupPokemons = [...groupPokemons,...response]
                if (index === filters?.types?.length-1) {
                    setData(eliminarDuplicados(groupPokemons));
                    SetMethod && SetMethod(eliminarDuplicados(groupPokemons));
                }
            })
            .catch((error) => {
                console.log('ocurrio un error', error)
            })
        });

    }


    const getPokemons = async () => {
        //console.log(filters?.types?.length, filters?.types);
        if (filters?.types?.length > 0) {
            await GroupPokemons()
        }else{
            await getAllPokemons()
        }
    }

    return {
        get: getPokemons,
        getAllPokemons: getAllPokemons
    }
}

