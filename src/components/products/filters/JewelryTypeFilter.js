import React, { useState } from "react";
import { BiBorderRadius } from "react-icons/bi";

export default function JewelryTypeFilter({ setType }) {
  const [searchTypeValue, setSearchTypeValue] = useState("");

  const handleSearch = (event) => {
    setType(searchTypeValue);
  };

  const handleChange = (event) => {
    setSearchTypeValue(event.target.value);
    setType(event.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="fiter-from" >
      <input
      className="filter-input"
        type="text"
        placeholder="Search for Jewelry Type"
        value={searchTypeValue}
        onChange={handleChange}
      />
    </form>
  );
}