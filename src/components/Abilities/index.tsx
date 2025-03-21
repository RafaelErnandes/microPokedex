import { AbilitiesProps } from "./types";

export const Abilities = (props: AbilitiesProps) => {
  const { abilities, bgColor } = props;

  return (
    <div className="px-5 py-2.5">
      <span
        className="font-bold text-[16px] leading-5 p-5"
        style={{ color: `var(--color-boxType-${bgColor})` }}
      >
        Abilities
      </span>
      {abilities.map((currentAbility) => (
        <div
          className="w-full flex flex-row items-center px-5 py-2.5"
          key={currentAbility.ability.name}
        >
          <span className="font-normal text-[16px] leading-5 text-detail capitalize">
            {currentAbility.ability.name}
          </span>
        </div>
      ))}
    </div>
  );
};
