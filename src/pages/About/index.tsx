// pages/About.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Abilities } from "../../components/Abilities";
import { BaseStats } from "../../components/BaseStats";
import { PokemonDetailProps } from ".";
import { PokemonHeader } from "../../components/PokemonHeader";
import { api } from "../../services/pokeService";

export const About = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [pokemon, setPokemon] = useState({} as PokemonDetailProps);
  const [bgColor, setbgColor] = useState("");
  const [load, setLoad] = useState(true);
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const navigate = useNavigate();

  const handleReturn = () => {
    const savedGeneration = localStorage.getItem("generation");

    if (savedGeneration) {
      navigate(`/?generation=${savedGeneration}`);
    } else {
      navigate("/?generation=1");
    }
  };

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const response = await api.get(`/pokemon/${pokemonId}`);
        const { stats, abilities, id, name, types } = response.data;

        const currentType = types[0].type.name;

        setbgColor(currentType);
        setPokemon({ stats, abilities, id, name, types });

        setLoad(false);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
        setLoad(false);
      }
    };

    getPokemonDetail();

    if (pokemonId) {
      getPokemonDetail();
    }
  }, [pokemonId]);

  return (
    <>
      {load ? (
        <span>Carregando...</span>
      ) : (
        <div className="flex flex-col">
          <PokemonHeader
            imageURL={imageURL}
            name={pokemon.name}
            id={pokemon.id}
            types={pokemon.types}
            bgColor={bgColor}
            handleReturn={handleReturn}
          />
          <BaseStats stats={pokemon.stats} bgColor={bgColor} />
          <Abilities abilities={pokemon.abilities} bgColor={bgColor} />
        </div>
      )}
    </>
  );
};
