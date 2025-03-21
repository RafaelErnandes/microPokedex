import { BoxTypeProps } from "./index";

export const BoxType = (props: BoxTypeProps) => {
  const { typeName } = props;
  const boxBackgroundClass = `bg-boxType-${typeName}`;

  return (
    <div
      key={typeName}
      className={`${boxBackgroundClass} p-1 w-16 h-6 rounded-[3px] ml-1 mt-1 flex justify-center items-center`}
    >
      <span className="font-medium text-[12px] leading-3.5 text-white capitalize">
        {typeName}
      </span>
    </div>
  );
};
