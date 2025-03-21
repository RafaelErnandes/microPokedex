import { PokemonProps, RequestPoke } from ".";
import { useEffect, useState } from "react";

import { Card } from "../Card/index.tsx";
import { api } from "../../services/pokeService";

export const Pokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

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

  return (
    <div className="grow bg-white p-5">
      {pokemons.map((pokemon) => (
        <Card data={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};
