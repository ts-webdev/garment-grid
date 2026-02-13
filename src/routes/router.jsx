import { createBrowserRouter } from "react-router";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/register/Register";
import AboutUs from "../pages/aboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
