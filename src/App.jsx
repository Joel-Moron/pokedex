import Aside from './components/Aside'
import LateralBar from './components/LateralBar'
import ModalPokemon from './components/ModalPokemon'
import Pokemons from './components/Pokemons'
function App() {

  return (
    <section className='bg-[#F6F8FC] max-h-screen font-outfit overflow-y-auto overflow-x-hidden'>
      <main className='max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 ' >
        <LateralBar />
        <Pokemons />
        <Aside />
        <ModalPokemon />
      </main>
    </section>
  )
}

export default App
