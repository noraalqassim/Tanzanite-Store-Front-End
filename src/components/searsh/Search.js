import React, { useState } from "react";
import "./Search.css";
import styles from "./Search.css";
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
      <div class="bbbootstrap">
        <div class="container">
          <div className="search-box">
            <form className="container-4" onSubmit={handleSearch}>
              <input
                className="input-search"
                type="search"
                id="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search..."
              />
              <button className="icon btn-searsh" type="submit">
                <i>
                  <IoSearch />
                </i>
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
