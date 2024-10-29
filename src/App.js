import { useState, useEffect } from "react";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import LayOut from "./components/layout/LayOut";
import NotFounPage from "./pages/NotFounPage";
import Loading from "./components/loading/Loading";
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });
  const GemstoneUrl = "https://fakestoreapi.com/products";

  function getDataFromServer() {
    axios
      .get(GemstoneUrl)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setProductResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getDataFromServer();
  }, []);

  console.log(productResponse, "from App");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}
    <NotFounPage/>
    </div>;
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
        // {
        //   path: "products",
        //   element: (
        //     <ProductPage
        //       // productList={productList}
        //       setUserInput={setUserInput}
        //       userInput={userInput}
        //       wishList={wishList}
        //       setWishList={setWishList}
        //     />
        //   ),
        // },
        // {
        //   path: "products/:productId",
        //   element: <ProductDetailPage />,
        // },

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
