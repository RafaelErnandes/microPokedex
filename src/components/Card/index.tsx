import { BoxType } from "../BoxType/index.tsx";
import { CardProps } from ".";
import dotsImage from "../../img/dots.png";
import pokeball from "../../img/pokeballCard.png";
import { useNavigate } from "react-router-dom";

export const Card = ({ data, ...rest }: CardProps) => {
  const type = data.types[0]?.type.name;
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  const navigate = useNavigate();

  const handleNavigation = (pokemonId: number) => {
    navigate(`/About/${pokemonId}`);
  };

  return (
    <div
      className={`bg-${type} mt-7 flex-row p-5 rounded-[10px] flex cursor-pointer`}
      onClick={() => handleNavigation(data.id)}
      {...rest}
    >
      <div className="w-1/2 relative">
        <div className="font-bold text-[12px] leading-3.5 text-id-pokemon">
          #{data.id}
        </div>
        <div className="font-bold text-2xl leading-8 mt-1 capitalize text-white">
          {data.name}
        </div>
        <img
          className="absolute w-[74px] h-8 left-[90px] top-[-10px]"
          src={dotsImage}
          alt="Pokemon Image"
        />
        <div className="flex">
          {data.types.map((pokemonType) => (
            <BoxType
              key={pokemonType.type.name}
              typeName={pokemonType.type.name}
            />
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-1/2 relative">
        <div className="absolute right-[-20px]">
          <img src={pokeball} alt="pokeball" />
        </div>
        <div className="mt-[-40px] w-32 h-32 absolute">
          <img src={imageURL} alt={data.name} />
        </div>
      </div>
    </div>
  );
};
