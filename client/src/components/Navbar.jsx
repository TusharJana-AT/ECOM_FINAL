import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const { user, logout } = useAuth();

  const role = user?.role;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-semibold">
        <Link to="/">MyStore</Link>
      </h1>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        {role !== "admin" && (
          <>
            
            <Link to="/orders" className="relative hover:text-gray-300">
              My Orders
            </Link>
            <Link to="/wishlist" className="relative hover:text-gray-300">
              WishList
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center hover:text-gray-300"
            >
              <ShoppingCart className="w-6 h-6" />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/add-product" className="hover:text-gray-300">
              Add Product
            </NavLink>
            <NavLink to="/admin/products" className="hover:text-gray-300">
              Products
            </NavLink>
            <NavLink to="/admin/dashboard" className="hover:text-gray-300">
              Dashboard
            </NavLink>
            <NavLink to="/admin/orders" className="hover:text-gray-300">
              Orders
            </NavLink>
            <NavLink to="/admin/users" className="hover:text-gray-300">
              Users
            </NavLink>
          </>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
