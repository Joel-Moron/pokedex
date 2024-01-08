import { useContext } from 'react';
import IconCancel from '../assets/icons/IconCancel';
import { PokemonContext } from '../context/PokemonContext';
import {pokemonTypesColor} from '../services/pokemonTypes';

const ModalPokemon = () => {

    const colorByStat = {
        HP: "bg-red-500",
        ATK: "bg-orange-500",
        DEF: "bg-yellow-500",
        SPA: "bg-blue-300",
        SpD: "bg-green-500",
        SPD: "bg-pink-500",
        TOT: "bg-blue-500",
    }

    const {showDetailPokemon, closePokemonDetail, pokemonDetail, showPokemon} = useContext(PokemonContext);

    return(
        <div 
            className={`z-[11] fixed lg:hidden left-0 right-0 bg-green-400 h-screen transition-all duration-500
            ${showDetailPokemon?'visible opacity-100 top-0':'top-full invisible opacity-0'}`}
        >
            <button 
                onClick={() => closePokemonDetail()} 
                className='bg-white absolute top-4 right-4 rounded-lg hover:opacity-80 transition-opacity'
            >
                <IconCancel width={32} stroke={3}></IconCancel>
            </button>
            <div 
                className={`bg-white h-[90%] absolute w-full bottom-0 rounded-t-3xl text-center transition-all duration-500
                px-4 content-start flex flex-col gap-2 ${showDetailPokemon?'bottom-0':'-bottom-full'}`}
            >
                <header className='relative h-8'>
                    <img className='min-h-20 max-h-24 absolute -top-14 left-[51%] -translate-x-1/2' src={pokemonDetail?.image} alt="" />
                </header>
                <span className="text-sm text-slate-400">N° {pokemonDetail?.id}</span>
                <h2 className="text-md sm:text-lg font-bold capitalize">{pokemonDetail?.name}</h2>
                <ul className="flex gap-2 justify-center">
                    {
                        pokemonDetail?.types?.map((type) => (
                            <li 
                                className={` p-1 rounded-md px-2 text-sm sm:text-base text-white ${pokemonTypesColor[type] || 'bg-slate-500'}`}
                                key={type}
                            >
                                {type}
                            </li>
                        ))
                    }
                    
                </ul>
                <div>
                    <h4 className="font-bold capitalize text-sm sm:text-base">Pokedex Entry</h4>
                    <p  className="text-slate-400 text-sm sm:text-base">
                        {pokemonDetail?.description}
                    </p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h4 className="font-bold capitalize text-sm sm:text-base">Height</h4>
                        <span className='bg-slate-200 block rounded-full p-1 capitalize text-sm sm:text-base'>{pokemonDetail?.height}m</span>
                    </div>
                    <div>
                        <h4 className="font-bold capitalize text-sm sm:text-base">Weight</h4>
                        <span className='bg-slate-200 block rounded-full p-1 capitalize text-sm sm:text-base'>{pokemonDetail?.weight}kg</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold capitalize text-sm sm:text-base">Abilities</h4>
                    <div className='grid grid-cols-2 gap-4'>
                    {
                        pokemonDetail?.abilities?.map((balility) => (
                            <div
                                key={balility}
                                className='bg-slate-200 bloc rounded-full p-1 capitalize text-sm sm:text-base'
                            >
                                <span>{balility}</span>
                            </div>
                        ))
                    }   
                    </div>
                </div>
                <div>
                    <h4 className="font-bold capitalize text-sm sm:text-base">Stats</h4>
                    <ul className='flex justify-center gap-2'>
                        {
                            pokemonDetail?.stats?.map((stat) => (
                                <li key={stat.name} className={`bg-slate-100 p-1 rounded-full ${stat.name==='TOT'&&'bg-blue-300'}`}>
                                    <span className={`flex justify-center items-center text-[0.7rem] text-white font-semibold h-6 w-6 sm:h-7 sm:w-7 rounded-full 
                                    ${colorByStat[stat.name]}`}>
                                        {stat.name}
                                    </span>
                                    <span className='font-bold capitalize text-sm sm:text-base'>{stat.base_stat}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <h4 className="font-bold capitalize text-sm sm:text-base">Evolutions</h4>
                    <ul className='flex justify-center gap-5 cursor-pointer '>
                        {
                            pokemonDetail?.evolutions?.map((evolution) => (
                                <div key={evolution.name} onClick={() => showPokemon(evolution.pokemonInfo)}>
                                    <img className='hover:bg-slate-200 transition-all duration-300 rounded-lg' src={evolution.image} alt={evolution.name} />
                                    <li key={evolution.name}>{evolution.name}</li>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ModalPokemon;