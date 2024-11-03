import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import NotFounPage from "../../../pages/NotFounPage";
import JewelryPagination from "./JewelryPagination";
import Search from "../../searsh/Search";
import Jewelry from "./Jewelry";

export default function Jewelrylist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userInput, setUserInput] = useState("");
  const [page, setPage] = useState(1);

  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  let limit = 3;
  let offset = (page - 1) * limit;

  function getJewelryUrl() {
    let url = `http://localhost:5125/api/v1/Jewelry?Limit=${limit}&Offset=${offset}`;

    if (userInput) {
      url += `&Search=${userInput}`;
    }

    console.log(url, "url");
    return url;
  }

  function getData() {
    axios
      .get(getJewelryUrl())
      .then((response) => {
        setJewelryResponse(response.data);
        console.log("API Response:", response.data);
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

  const  jewelryList= jewelryResponse.jewelry;
  if (!jewelryList) {
    return <div>No products found.</div>;
  }
  const  totalCount= jewelryResponse.totalCount;
  

  return (
    <div>
      <h1>Jewelrylist</h1>
      <Search setUserInput={setUserInput} />
      <div className="productList">
      {jewelryList.map((jewelryItem) => {
          return (
            <Jewelry
              key={jewelryItem.JewelryId}
              jewelryItem={jewelryItem}
            />
          );
        })}
      </div>
      <JewelryPagination
        totalCount={totalCount}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
