import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

import "./UserOrderHistory.css";
import NoOrder from "../error/NoOrder";
export default function UserOrderHistory(prop) {
  const { userData } = prop;

  const [orderList, setOrderList] = useState([]);

  function getOrderByUserId() {
    const token = localStorage.getItem("token");
    const url = `https://tanzanite-store-back-end.onrender.com/api/v1/Order/${userData.userId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrderList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getOrderByUserId();
  }, []);

  console.log(orderList, "orderList");

  if (orderList.length === 0) {
    return <NoOrder />;
  }
  return (
    <div>
      <h1> Order History </h1>
      <div className="orderTable">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Order number:</th>
              <th scope="col">Created At:</th>
              <th scope="col">Order Price:</th>
              <th scope="col">Order Status:</th>
              <th scope="col">Order Details:</th>
              <th scope="col">Review</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (
                <OrderItem
                  key={order.orderId}
                  order={order}
                  userData={userData}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
