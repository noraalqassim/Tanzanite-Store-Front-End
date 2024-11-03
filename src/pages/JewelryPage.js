import React from "react";
import Jewelrylist from "../components/products/jewelryProduct/Jewelrylist";
import Search from "../components/searsh/Search";
import JewelryPriceRangeForm from "../components/products/jewelryProduct/JewelryPriceRangeForm";

export default function JewelryPage(prop) {
  const {
    jewelryList,
    setUserInput,
    userInput,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    setMinPrice,
    setMaxPrice,
  } = prop;
  return (
    <div>
      <p>JewelryPage </p>
      <Search setUserInput={setUserInput} />
      <JewelryPriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      <Jewelrylist
      jewelryList={jewelryList}
      userInput={userInput}
      wishList={wishList}
      setWishList={setWishList}
      totalCount={totalCount}
      page={page}
      handleChange={handleChange}
      />
    </div>
  );
}
