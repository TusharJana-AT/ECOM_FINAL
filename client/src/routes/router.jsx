import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicLayout from "../layouts/PublicLayout";
import GuestRoute from "./GuestRoute";
import { getProducts } from "../api/api";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";
import AdminRoute from "./AdminRoute";
import AdminDashBoard from "../pages/AdminDashBoard";
import AdminProducts from "../pages/AdminProducts";
import PrivateLayout from "../layouts/PrivateLayout";
import MyOrders from "../pages/MyOrders";
import AdminEditProduct from "../pages/AdminEditProduct";
import AdminDashboard from "../pages/AdminDashBoard";
import AdminOrders from "../pages/AdminOrders";
import WishList from "../pages/WishList";
import CheckoutRoute from "./CheckoutRoute";
import SuccessGuard from "./SuccessGuard";
import AdminUsersPage from "../pages/AdminUsersPage";
import About from "../pages/Static/About";
import Contact from "../pages/Static/Contact";
import Privacy from "../pages/Static/Policy";
import OrderDetail from "../pages/OrdersDetail";

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
            path: "/admin",
            element: <AdminDashBoard />,
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
          },{
            path:"/admin/dashboard",
            element:<AdminDashboard/>
          },{
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
        element:<WishList/>
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
