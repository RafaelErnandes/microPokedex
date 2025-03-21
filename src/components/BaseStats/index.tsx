import { BaseStatsProps } from "./types";
import { ProgresBar } from "../ProgressBar";

export const BaseStats = (props: BaseStatsProps) => {
  const { bgColor, stats } = props;

  return (
    <div className="p-5 bg-white rounded-tl-[40px] rounded-tr-[40px] mt-[-40px] z-30">
      <span
        className={`font-bold text-[16px] leading-5 p-5`}
        style={{ color: `var(--color-boxType-${bgColor})` }}
      >
        Base Stats
      </span>
      <div className="mt-5">
        {stats.map((atribute) => (
          <div
            key={atribute.stat.name}
            className="w-full flex flex-row items-center px-5 py-2.5"
          >
            <div className="w-1/2 flex items-center">
              <span className="font-bold text-[14px] leading-3.5 capitalize text-primary">
                {atribute.stat.name}
              </span>
            </div>

            <div className="w-1/2 flex items-center justify-end">
              <span className="font-bold text-[16px] leading-5 text-right text-detail mr-5">
                {atribute.base_stat}
              </span>
              <ProgresBar atributes={atribute.base_stat} typeColor={bgColor} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
