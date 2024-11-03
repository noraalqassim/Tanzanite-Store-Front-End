import JewelryPagination from "./JewelryPagination";
import Search from "../../searsh/Search";
import Jewelry from "./Jewelry";
import "./Jewelrylist.css";
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
      <JewelryPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        limit={limit}
      />
    </div>
  );
}
