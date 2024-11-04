import React from "react";
import Search from "../components/searsh/Search";
import GemstoneList from "../components/products/gemstoneProducts/GemstoneList";
import GemstonePriceRangeForm from "../components/products/gemstoneProducts/GemstonePriceRangeForm";

export default function GemstonePage(prop) {
  const {
    gemstoneList,
    setUserInput,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    setMinPrice,
    setMaxPrice,
    limit,
  } = prop;
  

  console.log("Gemstone List in Page:", gemstoneList);
  return (
    <div>
      <p>GemstonePage</p>
      <Search setUserInput={setUserInput} />
      <GemstonePriceRangeForm
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <GemstoneList
        gemstoneList={gemstoneList}
        wishList={wishList}
        setWishList={setWishList}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        limit={limit}
      />
    </div>
  );
}
