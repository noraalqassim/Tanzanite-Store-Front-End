import React from "react";

import "./Search.css";
import { IoSearchOutline } from "react-icons/io5";
export default function Search(prop) {
  const { setUserInput } = prop;

  function onChangeHandler(event) {
    setUserInput(event.target.value);
  }
  return (
    <div className="search-box">
      <div className="search">
        <form className="form-Searsh">
          <label className="lable-Searsh">
            <IoSearchOutline />
          </label>
          <input
            className="input-Searsh"
            type="text"
            onChange={onChangeHandler}
            placeholder="Searsh"
          ></input>
        </form>
      </div>
    </div>
  );
}
