import { PokemonProps } from "../../components/pokemonContent";
import { useState } from "react";

export const useSearchPokemons = (pokemons: PokemonProps[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterPokemonsByGeneration = (searchTerm: string) => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredPokemons = searchTerm
    ? filterPokemonsByGeneration(searchTerm)
    : pokemons;

  return { searchTerm, filteredPokemons, handleSearch };
};
