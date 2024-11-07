import React, { useState, useEffect } from "react";
import axios from "axios";
import JewelryItmeDashBoard from "./JewelryItmeDashBoard";

export default function JewelrtDashBoard() {
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [jewelryError, setJewelryError] = useState(null);
  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  const getJewelryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5125/api/v1/Jewelry/all"
      );
      setJewelryResponse(response.data);
      console.log("API Jewelry Response:", response.data);
      setLoadingJewelry(false);
    } catch (error) {
      console.error("Error fetching jewelry products from dachboard: ", error);
      setJewelryError("Failed to fetch the jewelry product from dachboard");
      setLoadingJewelry(false);
    }
  };

  // Effect for Jewelry Data
  useEffect(() => {
    getJewelryData();
  }, []);
  console.log("jewelry list from dachboard:", jewelryResponse);

  return (
    <div>
      <h1>JewelrtDashBoard</h1>
      <p>Jewelry list </p>
      <p>Create new Jewelry</p>
      <div>
        {jewelryResponse.jewelry.map((jewelryItem) => {
          return (
            <JewelryItmeDashBoard
              key={jewelryItem.jewelryId}
              jewelryItem={jewelryItem}
              getJewelryData={getJewelryData}
            />
          );
        })}
      </div>
    </div>
  );
}
