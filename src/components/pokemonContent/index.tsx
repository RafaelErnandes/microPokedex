import { PokemonProps, RequestPoke } from "./index.ts";
import { useEffect, useState } from "react";

import { Card } from "../Card/index.tsx";
import { GenerationSelect } from "../GenerationSelect/index.tsx";
import { SearchBar } from "../SearchBar/index.tsx";
import { api } from "../../services/pokeService";
import { useNavigate } from "react-router-dom";

export const Pokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [generation, setGeneration] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGeneration = localStorage.getItem("generation");

    const searchParams = new URLSearchParams(location.search);
    const urlGeneration = searchParams.get("generation");

    if (urlGeneration) {
      setGeneration(Number(urlGeneration));
    } else if (savedGeneration) {
      setGeneration(Number(savedGeneration));
    } else {
      setGeneration(1);
    }
  }, [location.search]);

  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
    localStorage.setItem("generation", gen.toString());

    navigate(`/?generation=${gen}`);
  };

  useEffect(() => {
    const getPokemonsByGeneration = async (gen: number) => {
      const generationRange = getGenerationRange(gen);
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
        setFilteredPokemons(payloadPokemons);
      } catch (error) {
        console.log(error);
      }
    };

    getPokemonsByGeneration(generation);
  }, [generation]);

  const getMoreInfo = async (url: string): Promise<RequestPoke> => {
    const response = await api.get(url);
    const { id, types } = response.data;
    return { id, types: types || [] };
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPokemonsByGeneration(generation, term);
  };

  const filterPokemonsByGeneration = (gen: number, searchTerm: string) => {
    const generationRange = getGenerationRange(gen);
    const filteredByGen = pokemons.filter((pokemon) => {
      return (
        pokemon.id >= generationRange.start && pokemon.id <= generationRange.end
      );
    });

    if (searchTerm) {
      setFilteredPokemons(
        filteredByGen.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPokemons(filteredByGen);
    }
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

  return (
    <div className="grow bg-white p-5 flex flex-col justify-center items-center">
      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-col gap-3 items-center mt-3">
        <h2>Escolha a geração:</h2>
        <GenerationSelect
          onClick={handleGenerationChange}
          selectedGeneration={generation}
        />
      </div>

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
