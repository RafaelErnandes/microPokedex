import { useEffect, useState } from "react";

import { Card } from "../Card/index.tsx";
import { GenerationSelect } from "../GenerationSelect/index.tsx";
import { LoadingSpinner } from "../LoadingSpinner/index.tsx";
import { SearchBar } from "../SearchBar/index.tsx";
import { useNavigate } from "react-router-dom";
import { usePokemonsByGeneration } from "../../hooks/use-pokemons-by-generation/index.ts";
import { useSearchPokemons } from "../../hooks/use-search-pokemons/index.ts";

export const Pokemons = () => {
  const [generation, setGeneration] = useState<number>(1);
  const navigate = useNavigate();

  const { pokemons, loading } = usePokemonsByGeneration(generation);
  const { searchTerm, filteredPokemons, handleSearch } =
    useSearchPokemons(pokemons);

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
      {loading ? (
        <LoadingSpinner />
      ) : (
        filteredPokemons.map((pokemon) => (
          <Card data={pokemon} key={pokemon.id} />
        ))
      )}
    </div>
  );
};
