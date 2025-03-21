import { Pokemons } from "./components/pokemonContent/index.tsx";
import pokeballHeader from "./img/pokeball.png";

const App = () => {
  return (
    <div className="grow bg-white">
      <div className="h-56 w-full bg-white flex justify-center items-center">
        <img src={pokeballHeader} alt="pokeball header" className=" h-full" />
      </div>
      <span className="text-3xl leading-9 font-bold text-primary pl-5">
        Pokedéx
      </span>

      <Pokemons />
    </div>
  );
};

export default App;
