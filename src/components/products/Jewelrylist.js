import React, { useState } from "react";

import Jewelry from "./Jewelry";
import "./Jewelrylist.css";
import ProductPagination from "../pagination/ProductPagination";
import JewelryPriceRangeForm from "./JewelryPriceRangeForm";
import CatigoryFilters from "./filters/CatigoryFilters";

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
  } = prop;

  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProducts = selectedCategories.length
    ? jewelryList.filter((jewelryItem) =>
        selectedCategories.includes(jewelryItem.gemstone.category.categoryName)
      )
    : jewelryList;
    
  const products = filteredProducts;
  const categories = Array.from(
    new Set(
      jewelryList.map(
        (jewelryItem) => jewelryItem.gemstone.category.categoryName
      )
    )
  );

  return (
    <div className="page-body">
      <div className="filters">
        <div className="filters-borders">
          <p className="filter-p">Price Filters</p>
          <div className="price-filters">
            <JewelryPriceRangeForm
              style={{ marginBottom: "20px" }}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
          <p className="filter-p">Catigory </p>
          <div>
            <CatigoryFilters
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              categories={categories}
            />
          </div>
        </div>
      </div>
      <div className="products">
        <div className="productList">
          {products.map((jewelryItem) => (
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
