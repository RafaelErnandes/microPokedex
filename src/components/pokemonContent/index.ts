export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonProps = {
  id: number;
  name: string;
  url: string;
  types: PokemonType[];
};

export type RequestPoke = {
  id: number;
  types: PokemonType[];
};
