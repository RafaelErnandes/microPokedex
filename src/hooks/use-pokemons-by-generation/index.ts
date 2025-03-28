import { PokemonProps, RequestPoke } from "../../components/pokemonContent";
import { useEffect, useState } from "react";

import { Generations } from "./types";
import { api } from "../../services/pokeService";

export const usePokemonsByGeneration = (generation: number) => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generationsRanges: Generations = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 898 },
    9: { start: 899, end: 1025 },
  };

  useEffect(() => {
    const getPokemonsByGeneration = async (gen: number) => {
      const generationRange =
        /**
         * keyof necessario pois informa ao typescript que o valor de gen é uma chave válida do tipo Generations (1 a 9)
         */
        generationsRanges[gen as keyof Generations] || generationsRanges[1];
      setLoading(true);
      try {
        const response = await api.get(
          `/pokemon?limit=${
            generationRange.end - generationRange.start + 1
          }&offset=${generationRange.start - 1}`
        );
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
      } finally {
        setLoading(false);
      }
    };

    getPokemonsByGeneration(generation);
  }, [generation]);

  const getMoreInfo = async (url: string): Promise<RequestPoke> => {
    const response = await api.get(url);
    const { id, types } = response.data;
    return { id, types: types || [] };
  };

  return { pokemons, loading };
};
