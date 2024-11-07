import axios from "axios";
import React from "react";

import { Button } from "@mui/material";
export default function JewelryItmeDashBoard(prop) {
  const { jewelryItem, getJewelryData } = prop;

  //Delete DELETE -> http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}
  //Update Put -> http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}

  function deleteJewelryById() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert("a Jewelry Product is deleted Successfully👍");
          getJewelryData();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <p>{jewelryItem.jewelryId}</p>
      <p>{jewelryItem.jewelryName}</p>
      <p>{jewelryItem.jewelryType}</p>
      <p>{jewelryItem.jewelryPrice}</p>
      <p>{jewelryItem.jewelryImage}</p>
      <p>{jewelryItem.description}</p>
      <p>{jewelryItem.gemstone.gemstoneId}</p>
      <p>{jewelryItem.gemstone.gemstonePrice}</p>
      <p>{jewelryItem.gemstone.category.categoryId}</p>
      <p>{jewelryItem.finalProductPrice}</p>
      <Button onClick={deleteJewelryById}> Delete</Button>
      <button>Update</button>
    </div>
  );
}
