import React from "react";

import Jewelry from "./Jewelry";
import "./Jewelrylist.css";
import ProductPagination from "../pagination/ProductPagination";
import JewelryPriceRangeForm from "./JewelryPriceRangeForm";
import JewelryTypeFilter from "./filters/JewelryTypeFilter";

export default function Jewelrylist(prop) {
  const {
    jewelryList,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    limit,
    setMinPrice,
    setMaxPrice,
    type,
    setType,
  } = prop;

  

  return (
    <div className="page-body">
      <div className="filters">
        <ProductPagination
          totalCount={totalCount}
          page={page}
          handleChange={handleChange}
          limit={limit}
        />
        <div className="filters-borders">
          <p className="filter-p">Price Filters</p>
          <div className="price-filters">
            <JewelryPriceRangeForm
              style={{ marginBottom: "20px" }}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        </div>
        <div className="filters-borders">
          <p className="filter-p">Jewelry Type </p>
          <div className="type-filters">
            <JewelryTypeFilter 
            style={{ marginBottom: "20px" ,marginTop: "10px" }}
            setType={setType} />
          </div>
        </div>
      </div>
      <div className="products">
        <div className="productList">
          {jewelryList.map((jewelryItem) => (
            <Jewelry
              key={jewelryItem.jewelryId}
              jewelryItem={jewelryItem}
              wishList={wishList}
              setWishList={setWishList}
            />
          ))}
        </div>
        <ProductPagination
          totalCount={totalCount}
          page={page}
          handleChange={handleChange}
          limit={limit}
        />
      </div>
    </div>
  );
}
