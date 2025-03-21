export type RouteParams = {
  pokemonId: number;
};

export type Stats = {
  base_stat: 62;
  stat: {
    name: string;
  };
};

export type Ability = {
  ability: {
    name:
      | "grass"
      | "fire"
      | "water"
      | "poison"
      | "normal"
      | "bug"
      | "flying"
      | "eletric"
      | "ground";
  };
};

export type PokemonDetailType = {
  type: {
    name: string;
  };
};

export type PokemonDetailProps = {
  id: number;
  name: string;
  stats: Stats[];
  abilities: Ability[];
  types: PokemonDetailType[];
};
