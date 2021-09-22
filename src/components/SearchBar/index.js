import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  onSearchClick,
  containerClass,
}) {
  return (
    <div
      className={
        "w-full md:w-2/5 shadow flex item-center justify-center bg-white py-2 px-2 " +
        containerClass
      }
    >
      <input
        className="w-full outline-none text-lg "
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <FaSearch
        className="text-2xl text-blue-400 cursor-pointer"
        onClick={onSearchClick}
      />
    </div>
  );
}
