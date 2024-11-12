import React, { useState } from "react";
import axios from "axios";

import {
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";
import OrderDitails from "./OrderDitails";
export default function OrderItemDashBoard(prop) {
  const { order, getOrdersList } = prop;

  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState({ status: "Pending" });

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleStatusChange = (e) => {
    setUpdatedStatus({ status: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  const updateOrderStatus = () => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/Order/${order.orderId}`;

    axios
      .put(url, updatedStatus, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 204) {
          alert(`Order with ID (${order.orderId}) updated successfully`);
          getOrdersList();
          handleCloseUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Error updating order status:", error);
      });
  };
  //statuse style
  const getStatusStyle = (status) => {
    let style = {};

    switch (status) {
      case "Pending":
        style = { color: "red",fontSize: "1rem" }; 
        break;
      case "Shipped":
        style = { color: "blue",fontSize: "1rem"  };
        break;
      case "Delivered":
        style = { color: "green" ,fontSize: "1rem" }; 
        break;
      default:
        style = {}; 
        break;
    }

    return style;
  };

  return (
    <TableRow key={order.orderId}>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.userId}</TableCell>
      <TableCell>{order.createdAt}</TableCell>
      <TableCell>{order.addressId}</TableCell>
      <TableCell>{order.orderPrice}</TableCell>
      <TableCell style={getStatusStyle(order.status)}>{order.status}</TableCell>
      <TableCell>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleOpenDetails(order.orderId)}
        >
          Details
        </Button>
        <Dialog
          open={openDetails}
          maxWidth="md"
          fullWidth
          style={{ padding: "10px" }}
        >
          <div style={{ padding: "20px" }}>
            <h4>Order Numder:{order.orderId}</h4>
            <br />
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Jewelry name </th>
                  <th scope="col">Jewelry Image</th>
                  <th scope="col">Jewelry Price</th>
                  <th scope="col">Gemstone Name</th>
                  <th scope="col">Gemstone Price</th>
                  <th scope="col">Price per Piece</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {order.orderProducts.map((item) => (
                <OrderDitails key={item.orderId} item={item} />
              ))}
            </table>
            <h4>Order Price: ${order.orderPrice}</h4>
          </div>
          <Button onClick={handlePrint}>Print Order Details</Button>
          <br />
          <Button onClick={handleCloseDetails}>Close</Button>
        </Dialog>
      </TableCell>
      <TableCell>
        <Button color="success" variant="contained" onClick={handleOpenUpdate}>
          Update
        </Button>

        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogContent style={{ display: "flex", flexDirection: "column" }}>
            <Select
              value={updatedStatus.status}
              onChange={handleStatusChange}
              style={{ marginBottom: "1rem" }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
            <div style={{ marginTop: "auto" }}>
              <Button
                style={{ marginRight: "1rem" }}
                onClick={updateOrderStatus}
              >
                Update Status
              </Button>
              <Button onClick={handleCloseUpdate}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
