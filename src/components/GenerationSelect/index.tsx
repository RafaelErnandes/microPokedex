import { GenButton } from "../GenButton";
import { GenerationSelectProps } from "./types";

export const GenerationSelect = (props: GenerationSelectProps) => {
  const { onClick, selectedGeneration } = props;

  return (
    <div className="flex gap-3 flex-wrap justify-center ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
        <GenButton
          key={gen}
          generation={gen}
          onClick={onClick}
          isSelected={gen === selectedGeneration}
        >
          <span>{gen}</span>
        </GenButton>
      ))}
    </div>
  );
};
