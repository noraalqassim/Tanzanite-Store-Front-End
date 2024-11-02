import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import NotFounPage from "../../../pages/NotFounPage";
import JewelryPagination from "./JewelryPagination";
import Search from "../../searsh/Search";

export default function Jewelrylist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userInput, setUserInput] = useState("");
  const [page, setPage] = useState(1);

  const [jewelryResponse, setJewelryResponse] = useState({
    products: [],
    totalCount: 0,
  });

  let limit = 3;
  let offset = (page - 1) * limit;

  function getJewelryUrl() {
    let jewelryUrl = `http://localhost:5125/api/v1/Jewelry?Limit=${limit}&Offset=${offset}&Search=${userInput}&MinPrice=0&MaxPrice=10000`;

    console.log(jewelryUrl, "p");
    return jewelryUrl;
  }

  function getData() {
    axios
      .get(getJewelryUrl(userInput))
      .then((response) => {
        setJewelryResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jewelry products: ", error);
        setError("Failed to fetch the jewelry product");
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [offset, limit, userInput]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        {error}
        <NotFounPage />
      </div>
    );
  }

  const { products, totalCount } = jewelryResponse;
  console.log(jewelryResponse);

  return (
    <div>
      Jewelrylist
      <h1>Jewelrylist</h1>
      <Search setUserInput={setUserInput} />
      <div className="productList">
        {products.map((jewelry) => (
          <div key={jewelry.jewelryId}>
            <p>{jewelry.jewelryName}</p>
            <p>{jewelry.jewelryType}</p>
            <p>{jewelry.jewelryPrice}</p>
            <img src={jewelry.jewelryImage[0]} alt="Jewelry" />
            <p>{jewelry.description}</p>
          </div>
        ))}
      </div>
      <JewelryPagination
        totalCount={totalCount}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
