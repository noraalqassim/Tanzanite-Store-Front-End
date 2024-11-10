import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

import "./UserOrderHistory.css";
export default function UserOrderHistory(prop) {
  const { userData } = prop;

  const [orderList, setOrderList] = useState([]);

  function getOrderByUserId() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/Order/${userData.userId}`;
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
    return <div> No order history </div>;
  }
  return (
    <div>
      <h1> Order History </h1>
      <div className="orderTable">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Order number:</th>
              <th scope="col">Addres</th>
              <th scope="col">Created At:</th>
              <th scope="col">Order Price:</th>
              <th scope="col">Order Details:</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return <OrderItem key={order.orderId} order={order} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}