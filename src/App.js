import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, {
  useEffect,
  useState,
  useGemstoneState,
  useGemstoneEffect,
} from "react";
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
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Jewelry and Gemstone product states
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [jewelryError, setJewelryError] = useState(null);
  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  const [loadingGemstone, setLoadingGemstone] = useState(true);
  const [gemstoneError, setGemstoneError] = useState(null);
  const [gemstoneResponse, setGemstoneResponse] = useState({
    gemstone: [],
    totalCount: 0,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  const limit = 3;
  const offset = (page - 1) * limit;

  // Fetch Jewelry Data
  const getJewelryUrl = () => {
    let Jewelryurl = `http://localhost:5125/api/v1/Jewelry?Limit=${limit}&Offset=${offset}`;
    if (userInput) Jewelryurl += `&Search=${userInput}`;
    if (minPrice) Jewelryurl += `&MinPrice=${minPrice}`;
    if (maxPrice) Jewelryurl += `&MaxPrice=${maxPrice}`;
    console.log(Jewelryurl, "Jewelry url");
    return Jewelryurl;
  };

  const getJewelryData = async () => {
    try {
      const response = await axios.get(getJewelryUrl());
      setJewelryResponse(response.data);
      console.log("API Jewelry Response:", response.data);
      setLoadingJewelry(false);
    } catch (error) {
      console.error("Error fetching jewelry products: ", error);
      setJewelryError("Failed to fetch the jewelry product");
      setLoadingJewelry(false);
    }
  };

  // Fetch Gemstone Data
  const getGemstoneUrl = () => {
    let Gemstoneurl = `http://localhost:5125/api/v1/Gemstone?Limit=${limit}&Offset=${offset}`;
    if (userInput) Gemstoneurl += `&Search=${userInput}`;
    if (minPrice) Gemstoneurl += `&MinPrice=${minPrice}`;
    if (maxPrice) Gemstoneurl += `&MaxPrice=${maxPrice}`;
    console.log(Gemstoneurl, "Gemstone url");
    return Gemstoneurl;
  };

  const getGemstoneData = async () => {
    try {
      const response = await axios.get(getGemstoneUrl());
      console.log("API Gemstone Response:", response.data);
      setGemstoneResponse(response.data);
      setLoadingGemstone(false);
    } catch (error) {
      console.error("Error fetching gemstone products: ", error);
      setGemstoneError("Failed to fetch the gemstone product");
      setLoadingGemstone(false);
    }
  };

  // Effect for Jewelry Data
  useEffect(() => {
    getJewelryData();
  }, [offset, userInput, minPrice, maxPrice]);

  // Effect for Gemstone Data
  useEffect(() => {
    getGemstoneData();
  }, [offset, userInput, minPrice, maxPrice]);

  if (loadingJewelry || loadingGemstone) {
    return <Loading />;
  }

  if (jewelryError || gemstoneError) {
    return (
      <div>
        {jewelryError || gemstoneError}
        <NotFounPage />
      </div>
    );
  }

  console.log("Gemstone Response:", gemstoneResponse);

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
          element: (
            <GemstonePage
              gemstoneList={gemstoneResponse.gemstone}
              setUserInput={setUserInput}
              userInput={userInput}
              wishList={wishList}
              setWishList={setWishList}
              totalCount={gemstoneResponse.totalCount}
              page={page}
              handleChange={handleChange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              limit={limit}
            />
          ),
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
              limit={limit}
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
