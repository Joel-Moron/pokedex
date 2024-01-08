import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { types } from "../services/pokemonTypes";
import ServicesCrud from '../services/GetPokemons'
const LateralBar = () => {

    
    const {showFilterPokemon, setShowFilterPokemon, filters, setFilters, setAllPokemons} = useContext(PokemonContext);
    
    const { get, getAllPokemons } = ServicesCrud(setAllPokemons);

    const handleSelectType = (e) => {
        let exists = filters?.types.includes(e)
        let newArray = [];
        if (!exists) {
            newArray = [...filters?.types,...[e]]
        }else{
            newArray = filters?.types?.filter(name => name!==e)
        }
        setFilters(prevState => ({...prevState, types:newArray}));
    }

    const handleSelectOrder = (order) => {
        if (filters.order === order) {
            setFilters(prevState => ({...prevState, order:false}));
        }else if (order === 'DESC') {
            setFilters(prevState => ({...prevState, order:'DESC'}));
        }else if(order === 'ASC'){
            setFilters(prevState => ({...prevState, order:'ASC'}));
        }
    }

    const handleFilter = () => {
        get();
        setShowFilterPokemon()
    }

    const handleClearFilter = () => {
        setFilters({
            types:[],
            order:false,
            name:''
        })
        getAllPokemons()
        setShowFilterPokemon();
    };

    return(
        <div className={`z-[10] right-0 fixed top-0 left-0 bg-black/20 h-screen transition-all duration-500 
        ${showFilterPokemon?'visible opacity-100':'invisible opacity-0'}`}>
            <div className={` overflow-hidden h-full bg-[#F6F8FC] p-3 transition-all duration-1000 
            ${showFilterPokemon?'w-full sm:w-[300px]':'w-0'}`}>
                <div className="min-w-[276px] grid gap-5 "> 
                    <div className="w-full flex justify-end">
                        <span onClick={() => setShowFilterPokemon()} className='p-1 w-7 h-7 text-center cursor-pointer hover:bg-slate-400 rounded-full transition-all duration-300'>X</span>
                    </div>
                    {/* <h4 className='w-full text-end block'>Filter</h4> */}
                    <div className='text-center flex flex-col gap-3'>
                        <h5>Types</h5>
                        <ul className="flex flex-wrap gap-2 ">
                            {
                                types.map((type) => {
                                    if (type.name === 'shadow' || type.name === 'unknown') return;
                                    return <li key={type.name} onClick={() => handleSelectType(type.name)} className={`p-1 rounded-md px-2 text-sm font-semibold text-white cursor-pointer ${filters?.types?.includes(type.name) ? type.color:'bg-slate-400'}`}>{type.name}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button onClick={() => handleSelectOrder('ASC')} className={` py-1 px-5 rounded-lg ${filters?.order==='ASC'?'bg-blue-400':'bg-slate-400'}`}>A-Z</button>
                        <button onClick={() => handleSelectOrder('DESC')} className={` py-1 px-5 rounded-lg ${filters?.order==='DESC'?'bg-blue-400':'bg-slate-400'}`}>Z-A</button>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        <button onClick={() => handleFilter()}>Filtrar</button>
                        <button onClick={() => handleClearFilter()}>Sin Filtros</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LateralBar;