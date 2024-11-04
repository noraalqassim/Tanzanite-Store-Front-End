import React from "react";
import Gemstone from "./Gemstone";
import ProductPagination from "../../pagination/ProductPagination";

export default function GemstoneList(prop) {
  const {
    gemstoneList,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    limit,
  } = prop;

  console.log("GemstoneList props:", gemstoneList);
  return (
    <div>
      <div className="productList">
        {gemstoneList&&gemstoneList.map((gemstoneItem) => {
          return (
            <Gemstone
              key={gemstoneItem.gemstoneId}
              gemstoneItem={gemstoneItem}
              wishList={wishList}
              setWishList={setWishList}
            />
          );
        })}
      </div>
      <ProductPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        limit={limit}
      />
</div>
  );
}
