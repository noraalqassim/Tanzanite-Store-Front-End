import React, { useState } from "react";
import "./Search.css";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
export default function Search(prop) {
  const { setUserInput } = prop;
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setUserInput(searchValue);
  };

  return (
    <div className="search-box">
      <div class="box">
        <form class="container-4" onSubmit={handleSearch}>
          <input type="search" id="search"  value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)} placeholder="Search..." />
          <button class="icon" type="submit">
            <i><IoSearch /></i>
          </button>
        </form>
      </div>
    </div>
  );
}
