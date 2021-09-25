import React from "react";
import { HiSearch } from "react-icons/hi";

export default function SearchBar({
  value,
  onChange,
  onSearchClick,
  containerClass,
  placeholder,
}) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div
      className={
        "w-full md:w-2/5 shadow flex item-center rounded justify-center bg-white py-3 px-6 " +
        containerClass
      }
    >
      <input
        className="w-full outline-none text-lg "
        placeholder={placeholder ? placeholder : "Search"}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <HiSearch
        className="text-2xl text-blue-400 cursor-pointer"
        onClick={onSearchClick}
      />
    </div>
  );
}
