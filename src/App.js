import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import LayOut from "./components/layout/LayOut";
import NotFounPage from "./pages/NotFounPage";
import GemstonePage from "./pages/GemstonePage";
import JewelryPage from "./pages/JewelryPage";
function App() {

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
          element: <JewelryPage />,
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
