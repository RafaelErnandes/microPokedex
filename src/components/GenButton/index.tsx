import { GenButtonProps } from "./types";

export const GenButton = (props: GenButtonProps) => {
  const { generation, onClick, children, isSelected } = props;

  return (
    <button
      onClick={() => onClick(generation)}
      className={`px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ${
        isSelected ? "bg-primary" : "bg-genButton"
      } cursor-pointer`}
    >
      {children}
    </button>
  );
};
