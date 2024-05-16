import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/index";
import Callback from "./Callback";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Library from "./pages/library";
import Test from "./pages/test";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/callback",
        element: <Callback />,
    },
    {
        path: "/library",
        element: <Library />,
    },
    {
        path: "/library/:id",
        element: <Test />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
    </React.StrictMode>
);
