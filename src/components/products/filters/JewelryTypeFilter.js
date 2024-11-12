import React, { useState } from "react";

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
    <form onSubmit={handleSearch}  >
      <p style={{fontSize:"15px", color:"#4a4949"}}>'Necklace', 'Earrings', 'Bracelet', 'Ring'</p>
      <input
      style={{borderRadius:"10px"}}
        type="text"
        placeholder="Search for Jewelry Type"
        value={searchTypeValue}
        onChange={handleChange}
      />
    </form>
  );
}