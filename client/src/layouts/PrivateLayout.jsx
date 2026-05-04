// layouts/PrivateLayout.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWish } from "../api/api";
import { setWishlist } from "../features/cart/wishlistSlice";

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