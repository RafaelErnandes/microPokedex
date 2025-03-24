import { Pokemons } from "./components/pokemonContent/index.tsx";
import pokeballHeader from "./img/pokeball.png";

const App = () => {
  return (
    <div className="grow bg-white">
      <div className="h-56 w-full bg-white flex justify-center items-center">
        <img src={pokeballHeader} alt="pokeball header" className=" h-full" />
      </div>
      <div className="flex justify-center">
        <span className="text-3xl leading-9 font-bold text-primary">
          Pokedéx
        </span>
      </div>

      <Pokemons />
    </div>
  );
};

export default App;
