import { useState, useContext, useEffect, useRef } from "react";

//ICONS
import IconSearch from "../assets/search.svg"
import IconFilter from "../assets/filter.svg"

//SERVICES
import PokemonList from "./PokemonList";
import { useIntersectionObserver } from "../services/IntersectionObserver";

//CONTEXT
import { PokemonContext } from "../context/PokemonContext";

import GetPokemons from "../services/GetPokemons";
import FiltersPokemons from "../services/FiltersPokemons";


const Pokemons = () => {
    //context
    const { setShowFilterPokemon,setFilters, filters, allPokemons, setAllPokemons, pokemonsByFilters, setPokemonsByFilters } = useContext(PokemonContext)
    
    //states
    const [limit, setLimit] = useState(20);
    
    //IntersectionObserver
    const targetObserver = useRef(null);
    const entry = useIntersectionObserver(targetObserver,{});
    const isVisible = !!entry?.isIntersecting;
    
    //services
    const { get } = GetPokemons(setAllPokemons);
    const { filteredPokemons } = FiltersPokemons(allPokemons);
    
    //searchPokemon
    const searchPokemon = async(e) => {
        e.preventDefault();
        setLimit(20)
        setFilters(prevState => ({...prevState,name:e.target.pokemonSearch.value.toLowerCase()}));
    }
    //get pokemons
    useEffect(() => {
        setLimit(20)
        get()
    }, []);

    useEffect(() => {
        setLimit(20)
        setPokemonsByFilters(filteredPokemons())
    }, [allPokemons, filters.name]);

    //scroll infinity
    useEffect(() => {
        const maxPokemons = pokemonsByFilters?.length;
        if (isVisible && maxPokemons !== 0) {
            const newLimit = limit + 20;
            newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
        }
    }, [isVisible]);

    return(
        <section className="p-4 py-5">
            <div className="flex pl-3 gap-5 items-center">
                <button onClick={() => setShowFilterPokemon(true)} className="flex justify-center items-center rounded-lg shadow-lg h-[52px] min-w-[52px] bg-white">
                    <img className="" src={IconFilter} alt="filter" />
                </button>
                <form className="flex-1 flex w-auto p-2 shadow-lg bg-white rounded-lg" onSubmit={searchPokemon}>
                        <button className="w-8 sm:h-fit sm:w-fit"><img className="bg-red-500 p-[0.5rem] rounded-l-md w-[36px] h-[36px]" src={IconSearch} alt={'search'}/></button>
                        <input type="text" className=" w-[80%] rounded-r-md px-2 outline-none " placeholder="Search Pokemon" name="pokemonSearch"/>
                </form>
            </div>
            <PokemonList pokemons={pokemonsByFilters?.slice(0, limit)}/>
            <span ref={targetObserver}></span>
        </section>
    )
}

export default Pokemons;