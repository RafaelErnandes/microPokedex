import { PokemonDetailType } from "../../pages/About";

export type PokemonHeaderProps = {
  imageURL: string;
  name: string;
  id: number;
  types: PokemonDetailType[];
  bgColor: string;
  handleReturn: () => void;
};
