import { BoxType } from "../BoxType/index.tsx";
import { PokemonHeaderProps } from "./types";
import circle from "../../img/circle.png";

export const PokemonHeader = (props: PokemonHeaderProps) => {
  const { bgColor, handleReturn, id, imageURL, name, types } = props;

  return (
    <div
      className={`bg-${bgColor} h-[340px] p-5 flex flex-row items-center relative z-10`}
    >
      <div className="absolute top-[70px] left-10">
        <span
          className="material-icons size-6 text-white cursor-pointer"
          onClick={handleReturn}
        >
          chevron_left
        </span>
      </div>
      <div className="relative z-20">
        <img src={circle} className="w-[125px] h-[125px] absolute" />
        <img src={imageURL} className="w-[125px] h-[125px]" />
      </div>
      <div className="ml-8 z-30">
        <div className="text-[16px] leading-5 font-bold text-gray-600">
          #{id}
        </div>
        <div className="capitalize font-bold text-[28px] leading-9 text-white">
          {name}
        </div>
        <div className="flex flex-row">
          {types.map(({ type }) => (
            <BoxType key={type.name} typeName={type.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
