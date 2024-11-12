import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function OrderItem(props) {
  const { order } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <tr>
      <th scope="row">{order.orderId}</th>
      <td>{order.createdAt}</td>
      <td>$ {order.orderPrice}</td>
      <td>{order.status}</td>
      <td>
        <Button  className="custom-orders-button" onClick={handleOpen}>
          Show Details
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
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
                <OrderDetails key={item.orderId} item={item} />
              ))}
            </table>
            <h4>Order Price: ${order.orderPrice}</h4>
          </div>
          <Button className="custom-orders-button2 " onClick={handlePrint}>Print Order Details</Button>
          <br/>
          <Button  className="custom-orders-button2 " onClick={handleClose}>Close</Button>
        </Dialog>
      </td>
    </tr>
  );
}
