import { JSX } from "react";

export type GenButtonProps = {
  generation: number;
  onClick: (gen: number) => void;
  children: JSX.Element;
  isSelected: boolean;
};
