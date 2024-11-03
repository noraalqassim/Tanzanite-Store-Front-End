import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import Loading from "./components/loading/Loading";
import NotFounPage from "./components/error/NotFound";
import HomePage from "./pages/HomePage";
import LayOut from "./components/layout/LayOut";
import GemstonePage from "./pages/GemstonePage";
import JewelryPage from "./pages/JewelryPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";
function App() {
  const [wishList, setWishList] = useState([]);
  const [userInput, setUserInput] = useState("");

  //jewelry product
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [jewelryError, setJewelryError] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  console.log(minPrice, maxPrice, "price");
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  let limit = 3;
  let offset = (page - 1) * limit;

  function getJewelryUrl() {
    let Jewelryurl = `http://localhost:5125/api/v1/Jewelry?Limit=${limit}&Offset=${offset}`;

    if (userInput) {
      Jewelryurl += `&Search=${userInput}`;
    }
    if (minPrice) {
      Jewelryurl += `&MinPrice=${minPrice}`;
    }
    if (maxPrice) {
      Jewelryurl += `&MaxPrice=${maxPrice}`;
    }
    console.log(Jewelryurl, "Jewelry url");
    return Jewelryurl;
  }

  function getData() {
    axios
      .get(getJewelryUrl())
      .then((response) => {
        setJewelryResponse(response.data);
        console.log("API Response:", response.data);
        setLoadingJewelry(false);
      })
      .catch((error) => {
        console.error("Error fetching jewelry products: ", error);
        setJewelryError("Failed to fetch the jewelry product");
        setLoadingJewelry(false);
      });
  }

  useEffect(() => {
    getData();
  }, [offset, limit, userInput, minPrice, maxPrice]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loadingJewelry) {
    return <Loading/>;
  }

  if (jewelryError) {
    return (
      <div>
        {jewelryError}
        <NotFounPage />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/gemstone",
          element: <GemstonePage />,
        },
        {
          path: "/jewelry",
          element: (
            <JewelryPage
              jewelryList={jewelryResponse.jewelry}
              setUserInput={setUserInput}
              userInput={userInput}
              wishList={wishList}
              setWishList={setWishList}
              totalCount={jewelryResponse.totalCount}
              page={page}
              handleChange={handleChange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          ),
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path: "/login",
          element: <UserLogin />,
        },

        // { path: "/wishList", element: <WishListPage wishList={wishList} /> },

        // { path: "/cart", element: <CartPage /> },
      ],
    },
    { path: "*", element: <NotFounPage /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
