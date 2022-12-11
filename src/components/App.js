import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
