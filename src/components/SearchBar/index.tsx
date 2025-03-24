import { ChangeEvent, useState } from "react";

import { SearchBarProps } from "./types";

export const SearchBar = (props: SearchBarProps) => {
  const { onSearch } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
      <div className="flex items-center border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200">
        <span className="material-icons text-gray-500 mr-2">search</span>

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Pesquise por Pokémon"
          className="w-full p-2 text-sm text-gray-700 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};
