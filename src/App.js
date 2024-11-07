import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import Loading from "./components/loading/Loading";
import NotFounPage from "./components/error/NotFound";
import HomePage from "./pages/HomePage";
import LayOut from "./components/layout/LayOut";
import JewelryPage from "./pages/JewelryPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";
import { ContactUs } from "./components/contact/ContactUs";
import WishListPage from "./pages/WishListPage";
import UserProfile from "./components/user/UserProfile";
import ProtectedRoute from "./components/user/ProtectedRoute";
import JewelryDetialsPage from "./pages/JewelryDetialsPage";

function App() {
  const [wishList, setWishList] = useState([]);
  console.log(wishList, "wishList");

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

  // Effect for Jewelry Data
  useEffect(() => {
    getJewelryData();
  }, [offset, userInput, minPrice, maxPrice]);
  console.log("jewelry list from app:", jewelryResponse);



  //profile
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userData, setUserData] = useState(null);

  function getUserData() {
    setLoadingUserData(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/User/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setUserData(resp.data);
        console.log("API Profile Response:", resp.data);
        setLoadingUserData(false);
      })
      .catch((error) => {
        console.log("Profile error:", error);
        setLoadingUserData(false);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);
  console.log("user data from app:", userData);

  let isAuthenticated = userData ? true : false;

  if (loadingJewelry) {
    return <Loading />;
  }

  if (jewelryError) {
    return (
      <div>
        {jewelryError }
        <NotFounPage />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          wishList={wishList}
          isAuthenticated={isAuthenticated}
          userData={userData}
        />
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/contactUs",
          element: <ContactUs />,
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
          path: "/jewelry/:jewelryId",
          element: <JewelryDetialsPage />,
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path: "/login",
          element: <UserLogin getUserData={getUserData} />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              loadingUserData={loadingUserData}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userData={userData} setUserData={setUserData} />
              }
            />
          ),
        },

        { path: "/wishList", element: <WishListPage wishList={wishList} setWishList={setWishList}/> },

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
