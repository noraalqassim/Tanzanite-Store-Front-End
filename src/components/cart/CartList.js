import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../error/EmptyCart";
import CartItem from "./CartItem";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./cart.css";
export default function CartList(prop) {
  const { cartList, setCartList, userData } = prop;

  const navigate = useNavigate();

  if (cartList.length === 0) {
    return <EmptyCart />;
  }
  //total price
  const totalPrice = cartList.reduce((acc, item) => {
    const result = acc + item.finalProductPrice * item.quantity;
    return result;
  }, 0);

  //https://tanzanite-store-back-end.onrender.com/api/v1/Order

  const orderProducts = cartList.map((item) => {
    return { jewelryId: item.jewelryId, quantity: item.quantity };
  });

  const token = localStorage.getItem("token");
  //checkout
  function checkOut() {
    if (!userData) {
      alert("Please Log in to checkout");
      navigate("/login");
      return;
    }
    const orderUrl =
      "https://tanzanite-store-back-end.onrender.com/api/v1/Order";
    axios
      .post(
        orderUrl,
        {
          orderProducts: orderProducts,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res, "order list");

        if (res.status === 200) {
          alert("Order is created successfully! ");
          navigate("/jewelry");
          setCartList([]);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
        navigate("/profile");
      });
  }

  return (
    <div className="card-cart">
      <div className="row">
        <div className="col-md-9 cart">
          <div className="cart-title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
                {cartList.length} Items
              </div>
            </div>
          </div>
          <div class="row border-top border-bottom">
            {cartList.map((cart) => (
              <CartItem
                key={cart.jewelryId}
                cart={cart}
                cartList={cartList}
                setCartList={setCartList}
              />
            ))}
          </div>
          <div className="back-to-shop">
            <Link to="/jewelry">
              <FaArrowLeftLong />
              <span className="text-muted">Back to shop</span>{" "}
            </Link>
          </div>
        </div>
        <div className="col-md-3 summary">
          <div>
            <h5 className="h5-cart">
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <div className="row">
            <div className="col" style={{ paddingLeft: 0 }}>
              {cartList.length} Items
            </div>
          </div>
          <form className="cart-form">
            <p className="cart-p">GIVE CODE</p>
            <input id="code" placeholder="Enter your code" />
          </form>
          <div
            className="row"
            style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
          >
            <div className="col total-cart">TOTAL PRICE</div>
            <div className="col text-right">${totalPrice}</div>
          </div>
          <button className="btn" onClick={checkOut}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
