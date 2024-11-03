import React,{useEffect} from "react";
import "../whishlist/WishList.css";
import WishListItem from "./WishListItem";
import emptyWishlist from "../../images/EmptyWishlist.png";
export default function WishList(prop) {
  const { wishList, setWishList } = prop;

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, [setWishList]);
  if (wishList.length === 0) {
    return (
      <div>
        <img src={emptyWishlist} alt="Empty Wishlist" />
      </div>
    );
  }

  function deleteItem(itemId) {
    const updatedWishList = wishList.filter((item) => item.id !== itemId);
    setWishList(updatedWishList);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  }

  return (
    <div className="wishList">
      <div className="title">Shopping Bag</div>
      <br />
      <br />
      {wishList.map((item) => {
        return (
          <WishListItem key={item.id} item={item} deleteItem={deleteItem} />
        );
      })}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
