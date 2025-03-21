import { Line } from "rc-progress";
import { ProgresBarProps } from "./types";

export const ProgresBar = (props: ProgresBarProps) => {
  const { atributes, typeColor } = props;

  return (
    <div className="w-full">
      <Line
        percent={atributes}
        strokeColor={`var(--color-boxType-${typeColor})`}
        strokeWidth={8}
        trailColor="transparent"
        style={{
          transition: "stroke-dashoffset 1s ease-in-out",
        }}
      />
    </div>
  );
};
