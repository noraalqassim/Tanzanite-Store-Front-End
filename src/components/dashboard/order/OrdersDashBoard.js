import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import OrderItemDashBoard from "./OrderItemDashBoard";
import DrawerListDashBoard from "../DrawerListDashBoard";

export default function OrdersDashBoard() {
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const [ordersList, setOrdersList] = useState([]);

  const getOrdersList = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/Order";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrdersList(response.data);
      setLoadingOrders(false);
      console.log("API Orders Response from dashboard:", response.data);
    } catch (error) {
      console.error("Error fetching Orders List from dashboard: ", error);
      setOrdersError("Failed to fetch the Orders List from dashboard");
      setLoadingOrders(false);
    }
  };

  // Effect for Order List
  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
    >
      <DrawerListDashBoard />
      <div style={{ width: "1100px" }}>
        <h2 style={{ textAlign: "center" }}>Orders List</h2>
        <Table size="small" style={{ border: "1px solid #ccc" }}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell>Address ID</TableCell>
              <TableCell>Order Price</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList.map((order) => {
              return (
                <OrderItemDashBoard
                  key={order.orderId}
                  order={order}
                  getOrdersList={getOrdersList}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
