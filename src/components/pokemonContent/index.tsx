import { useEffect, useState } from "react";

import { Card } from "../Card/index.tsx";
import { GenerationSelect } from "../GenerationSelect/index.tsx";
import { LoadingSpinner } from "../LoadingSpinner/index.tsx";
import { SearchBar } from "../SearchBar/index.tsx";
import { useNavigate } from "react-router-dom";
import { usePokemonsByGeneration } from "../../hooks/use-pokemons-by-generation/index.ts";
import { useSearchPokemons } from "../../hooks/use-search-pokemons/index.ts";

export const Pokemons = () => {
  const navigate = useNavigate();

  const [generation, setGeneration] = useState<number>(() => {
    const savedGeneration = localStorage.getItem("generation");
    const searchParams = new URLSearchParams(location.search);
    const urlGeneration = searchParams.get("generation");

    if (urlGeneration) {
      return Number(urlGeneration);
    } else if (savedGeneration) {
      return Number(savedGeneration);
    } else {
      return 1;
    }
  });

  const { pokemons, loading } = usePokemonsByGeneration(generation);
  const { searchTerm, filteredPokemons, handleSearch } =
    useSearchPokemons(pokemons);

  useEffect(() => {
    localStorage.setItem("generation", generation.toString());
    navigate(`/?generation=${generation}`);
  }, [generation, navigate]);

  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
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
