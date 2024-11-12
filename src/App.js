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
import DashboardPage from "./pages/DashboardPage";
import JewelrtDashBoard from "./components/dashboard/jewelry/JewelrtDashBoard";
import UsersDashBoard from "./components/dashboard/users/UsersDashBoard";
import UserAddres from "./components/user/UserAddres";
import CartPage from "./pages/CartPage";
import UserOrderHistory from "./components/orders/UserOrderHistory";
import OrdersDashBoard from "./components/dashboard/order/OrdersDashBoard";
function App() {
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
  console.log(wishList, "wishList");
  console.log(cartList, "cartList");

  const [userInput, setUserInput] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);

  // Jewelry product states
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [jewelryError, setJewelryError] = useState(null);
  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  const limit = 4;
  const offset = (page - 1) * limit;

  // Fetch Jewelry Data
  const getJewelryUrl = () => {
    let Jewelryurl = `http://localhost:5125/api/v1/Jewelry?Limit=${limit}&Offset=${offset}`;
    if (userInput) Jewelryurl += `&Search=${userInput}`;
    if (minPrice) Jewelryurl += `&MinPrice=${minPrice}`;
    if (maxPrice) Jewelryurl += `&MaxPrice=${maxPrice}`;
    if (type) Jewelryurl += `&Type=${type}`;
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
  }, [offset, userInput, minPrice, maxPrice, type]);
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

  //addres
  const [loadingUserAddres, setLoadingUserAddres] = useState(true);
  const [userAddresError, setUserAddresError] = useState(null);
  const [userAddres, setUserAddres] = useState([]);

  const getUserAddresList = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/Address/UserAddress";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserAddres(response.data);
      setLoadingUserAddres(false);
      console.log("API User Addres Response:", response.data);
    } catch (error) {
      console.error("Error fetching User Addres List from profile: ", error);
      setUserAddresError("Failed to fetch the User Addres from profile");
      setLoadingUserAddres(false);
    }
  };

  // Effect for User List
  useEffect(() => {
    getUserAddresList();
  }, []);
  console.log(userAddres, "userAddres");

  let isAuthenticated = userData ? true : false;

  if (loadingJewelry) {
    return <Loading />;
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
      element: (
        <LayOut
          wishList={wishList}
          cartList={cartList}
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
              type={type}
              setType={setType}
            />
          ),
        },
        {
          path: "/jewelry/:jewelryId",
          element: (
            <JewelryDetialsPage cartList={cartList} setCartList={setCartList} />
          ),
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
                <UserProfile
                  userData={userData}
                  setUserData={setUserData}
                  userAddres={userAddres}
                  setUserAddres={setUserAddres}
                />
              }
            />
          ),
          children: [
            { path: "Addres", element: <UserAddres userData={userData} /> },
          ],
        },
        {
          path: "/orders",
          element: <UserOrderHistory userData={userData} />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              loadingUserData={loadingUserData}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<DashboardPage userData={userData} />}
            />
          ),
        },
        {
          path: "/jewelry-dashboard",
          element: (
            <ProtectedRoute
              loadingUserData={loadingUserData}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<JewelrtDashBoard />}
            />
          ),
        },
        {
          path: "/users-dashboard",
          element: (
            <ProtectedRoute
              loadingUserData={loadingUserData}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<UsersDashBoard />}
            />
          ),
        },
        {
          path: "/orders-dashboard",
          element: (
            <ProtectedRoute
              loadingUserData={loadingUserData}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<OrdersDashBoard />}
            />
          ),
        },
        ,
        {
          path: "/wishList",
          element: (
            <WishListPage wishList={wishList} setWishList={setWishList} />
          ),
        },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },
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
