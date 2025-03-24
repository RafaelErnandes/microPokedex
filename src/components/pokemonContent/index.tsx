import { PokemonProps, RequestPoke } from ".";
import { useEffect, useState } from "react";

import { Card } from "../Card/index.tsx";
import { SearchBar } from "../SearchBar/index.tsx";
import { api } from "../../services/pokeService";

export const Pokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const response = await api.get("/pokemon");
        const { results } = response.data;

        const payloadPokemons = await Promise.all(
          results.map(async (pokemon: PokemonProps) => {
            const { id, types } = await getMoreInfo(pokemon.url);

            return {
              name: pokemon.name,
              id,
              types,
            };
          })
        );
        setPokemons(payloadPokemons);
        setFilteredPokemons(payloadPokemons);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPokemons();
  }, []);

  const getMoreInfo = async (url: string): Promise<RequestPoke> => {
    const response = await api.get(url);
    const { id, types } = response.data;

    return { id, types: types || [] };
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setFilteredPokemons(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  return (
    <div className="grow bg-white p-5 flex flex-col justify-center items-center">
      <SearchBar onSearch={handleSearch} />

      {searchTerm && <h2>Resultados para: "{searchTerm}"</h2>}
      {filteredPokemons.length === 0 ? (
        <p>Nenhum Pokémon encontrado.</p>
      ) : (
        filteredPokemons.map((pokemon) => (
          <Card data={pokemon} key={pokemon.id} />
        ))
      )}
    </div>
  );
};
