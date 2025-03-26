import { PokemonProps, RequestPoke } from "../../components/pokemonContent";
import { useEffect, useState } from "react";

import { api } from "../../services/pokeService";

export const usePokemonsByGeneration = (generation: number) => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPokemonsByGeneration = async (gen: number) => {
      const generationRange = getGenerationRange(gen);
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

  const getGenerationRange = (gen: number) => {
    switch (gen) {
      case 1:
        return { start: 1, end: 151 };
      case 2:
        return { start: 152, end: 251 };
      case 3:
        return { start: 252, end: 386 };
      case 4:
        return { start: 387, end: 493 };
      case 5:
        return { start: 494, end: 649 };
      case 6:
        return { start: 650, end: 721 };
      case 7:
        return { start: 722, end: 809 };
      case 8:
        return { start: 810, end: 898 };
      case 9:
        return { start: 899, end: 1025 };
      default:
        return { start: 1, end: 151 };
    }
  };

  return { pokemons, loading };
};
