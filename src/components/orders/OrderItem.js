import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Rating,
} from "@mui/material";

export default function OrderItem(props) {
  const { order, userData } = props;
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(() => {
    const isReviewSubmitted = localStorage.getItem(
      `reviewSubmitted_${order.orderId}`
    );
    return isReviewSubmitted === "true";
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePrint = () => {
    window.print();
  };
  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const [rating, setRating] = useState(0);
  function onChangeHandler(event, newValue) {
    setRating(newValue);
  }

  //add review for order

  const [reviewInfo, setReviewInfo] = useState({
    reviewRating: rating,
    reviewComment: "",
    userId: order.userId,
    orderId: order.orderId,
  });

  function onChangeHandlerReview(event, newValue) {
    setRating(newValue);
    setReviewInfo({
      ...reviewInfo,
      reviewRating: newValue,
    });
  }
  function onChangeHandler(event) {
    setReviewInfo({
      ...reviewInfo,
      [event.target.name]: event.target.value,
    });
  }

  console.log("review Info", reviewInfo);

  // send request to backend
  function CreateNewReview() {
    const token = localStorage.getItem("token");
    const url = "https://tanzanite-store-back-end.onrender.com/api/v1/Reviews";
    axios
      .post(url, reviewInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Review created successfully");
          handleCloseReview();
          setReviewSubmitted(true);
          localStorage.setItem(`reviewSubmitted_${order.orderId}`, true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <tr>
      <th scope="row">{order.orderId}</th>
      <td>{order.createdAt}</td>
      <td>$ {order.orderPrice}</td>
      <td>{order.status}</td>
      <td>
        <Button className="custom-orders-button" onClick={handleOpen}>
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
          <Button className="custom-orders-button2 " onClick={handlePrint}>
            Print Order Details
          </Button>
          <br />
          <Button className="custom-orders-button2 " onClick={handleClose}>
            Close
          </Button>
        </Dialog>
      </td>
      <td>
        <div>
          <Button
            className="custom-orders-button2"
            onClick={handleOpenReview}
            disabled={reviewSubmitted}
            style={{ display: reviewSubmitted ? "none" : "inline-block" }}
          >
            Add Review
          </Button>
          <Dialog
            open={openReview}
            onClose={handleCloseReview}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Review
              <IconButton
                onClick={handleCloseReview}
                style={{ float: "right" }}
              ></IconButton>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={2}>
                <Rating
                  name="reviewRating"
                  value={rating}
                  onChange={onChangeHandlerReview}
                />
                <TextField
                  name="reviewComment"
                  onChange={onChangeHandler}
                  variant="outlined"
                  label="Comment"
                />
                <Button
                  onClick={CreateNewReview}
                  color="primary"
                  variant="contained"
                >
                  Create
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
}
