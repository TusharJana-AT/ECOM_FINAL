// layouts/PrivateLayout.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWish } from "../api/api";
import { setWishlist } from "../features/cart/wishlistSlice";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PrivateLayout = () => {
  const { user, loading } = useAuth();
  

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
);
};

export default PrivateLayout;