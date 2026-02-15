import { createBrowserRouter } from "react-router";
import Home from "../pages/home/home/Home";

import RootLayout from "../layouts/RootLayout";

import AboutUs from "../pages/aboutUs/AboutUs";
import Contact from "../pages/contact/Contact";
import AllProducts from "../pages/allProducts/AllProducts";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import ProductDetails from "../pages/productDetails/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Payment from "../pages/payment/Payment";
import MyOrders from "../pages/dashboard/buyer/myOrders/MyOrders";

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
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/product/:id",
        Component: ProductDetails,
        
        
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "payment",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        Component: MyOrders,
      }
    ],
  },
]);
