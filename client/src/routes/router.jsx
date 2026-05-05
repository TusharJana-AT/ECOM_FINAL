import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import GuestRoute from "./GuestRoute";
import { getProducts } from "../api/api";

import AdminRoute from "./AdminRoute";

import CheckoutRoute from "./CheckoutRoute";
import SuccessGuard from "./SuccessGuard";

import About from "../pages/Static/About";
import Contact from "../pages/Static/Contact";
import Privacy from "../pages/Static/Policy";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/shop/Home";
import Product from "../pages/shop/Product";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddProduct from "../pages/admin/AddProduct";
import AdminDashboard from "../pages/admin/AdminDashBoard";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminEditProduct from "../pages/admin/AdminEditProduct";
import AdminOrders from "../pages/admin/AdminOrders";
import Cart from "../pages/shop/Cart";
import Wishlist from "../pages/user/WishList";
import Checkout from "../pages/shop/Checkout";
import Success from "../pages/shop/Success";
import MyOrders from "../pages/order/MyOrders";
import OrderDetail from "../pages/order/OrdersDetail";
import PrivateLayout from "../layouts/PrivateLayout";
import MyProfile from "../pages/user/MyProfile";


const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/privacy",
        element:<Privacy/>
      },

      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/add-product",
            element: <AddProduct />,
          },
          {
            path: "/admin/products",
            element: <AdminProducts />,
          },
          {
            path:"/admin/edit/:id",
            element:<AdminEditProduct/>
          },,{
            path:"/admin/orders",
            element:<AdminOrders />
          },{
            path:"/admin/users",
            element:<AdminUsersPage/>
          }
        ],
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/wishlist",
        element:<Wishlist/>
      },{
        path:'/my-profile',
        element:<MyProfile/>
      },
      {
        path: "/checkout",
        element: (
          <CheckoutRoute>
            <Checkout />,
          </CheckoutRoute>
        )
      },
      {
        path: "/success",
        element: (
          <SuccessGuard>
            <Success />,
          </SuccessGuard>
        )
      },
      { path: "/orders", element: <MyOrders /> },
      { path: "/orders/:id", element: <OrderDetail /> },
    ],
  },
]);

export default router;
