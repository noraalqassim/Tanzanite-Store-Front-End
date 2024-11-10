import React from "react";
import { Button } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import "./cart.css";
export default function CartItem(prop) {
  const { cart, cartList, setCartList } = prop;

  function increaseQuantity(jewelryId) {
    const newCartList = cartList.map((item) => {
      if (item.jewelryId === jewelryId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function decreaseQuantity(jewelryId) {
    const newCartList = cartList.map((item) => {
      if (item.quantity === 1) {
        return item;
      }
      if (item.jewelryId === jewelryId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function removeProduct() {
    setCartList(
      cartList.filter((cartItem) => cartItem.jewelryId !== cart.jewelryId)
    );
  }

  return (
    <div className="row main align-items-center">
      <div className="col-2">
        <img
          className="img-fluid"
          src={cart.jewelryImage[0]}
          alr={cart.jewelryName}
        />
      </div>
      <div className="col">
        <div className="row cart-name ">{cart.jewelryName}</div>
      </div>
      <div className="col d-flex align-items-center">
        <Button
          className="a-cart"
          onClick={() => increaseQuantity(cart.jewelryId)}
        >
          +
        </Button>
        <p className="a-cart">{cart.quantity}</p>
        <Button
          className="a-cart"
          onClick={() => decreaseQuantity(cart.jewelryId)}
        >
          -
        </Button>
      </div>
      <div className="col">${cart.finalProductPrice}</div>
      <div className="col">
        <span className="close">
          <MdDeleteOutline onClick={removeProduct} />
        </span>
      </div>
    </div>
  );
}
