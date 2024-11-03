
import Jewelry from "./Jewelry";
import "./Jewelrylist.css";
import ProductPagination from "../../pagination/ProductPagination";
export default function Jewelrylist(prop) {
  const {
    jewelryList,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    limit
  } = prop;
  console.log("jewelryList props:", jewelryList);
  return (
    <div>
      <div className="productList">
        {jewelryList.map((jewelryItem) => {
          return (
            <Jewelry
              key={jewelryItem.jewelryId}
              jewelryItem={jewelryItem}
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
