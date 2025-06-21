import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./components/Layout";
import ViewItems from "./pages/ViewItems";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

const App = () => {
  const [items, setItems] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Layout with header/footer and <Outlet />
      children: [
        {
          index: true,
          element: <ViewItems items={items} setItems={setItems} />,
        },
        {
          path: "addItems",
          element: <AddItem items={items} setItems={setItems} />,
        },
        {
          path: "item/:itemId",
          element: <ItemDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

//path = on which route/url we want to redirect
//element = after clicking the path/url,to which element we want to redirect
