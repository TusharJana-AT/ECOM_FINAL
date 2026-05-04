import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { clearWishlist } from "../features/cart/wishlistSlice";
import { clearCart } from "../features/cart/cartSlice";
import { getUser } from "../api/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       setUser(decoded);
  //     } catch {
  //       localStorage.removeItem("token");
  //     }
  //   }
  //   setLoading(false);
  // }, []);
  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getUser();
      setUser(res.data.data);
      console.log("JANA", res.data);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);

    // dispatch(clearWishlist());
    // dispatch(clearCart());
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearWishlist());
    dispatch(clearCart());
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
