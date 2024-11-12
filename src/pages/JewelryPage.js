import React from "react";
import Jewelrylist from "../components/products/Jewelrylist";
import Search from "../components/searsh/Search";
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
    limit,
    type,
    setType,
  } = prop;

  console.log("jewelry List in Page:", jewelryList);
  return (
    <div>
      <Search setUserInput={setUserInput} />
      <Jewelrylist
        jewelryList={jewelryList}
        wishList={wishList}
        setWishList={setWishList}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        limit={limit}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        type={type}
        setType={setType}
      />
    </div>
  );
}
