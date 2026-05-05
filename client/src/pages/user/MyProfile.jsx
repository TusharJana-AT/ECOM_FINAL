import React, { useEffect, useState } from "react";
import { getUser } from "../../api/api";
import { Link } from "react-router-dom";
import { Package, Heart } from "lucide-react";
function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
    
      
        <div className="bg-white rounded-xl shadow p-6 text-center">

          <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0)}
          </div>

          <h2 className="text-xl font-semibold mt-3">
            {user?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>

          <div className="mt-6 space-y-3">

            <Link
              to="/orders"
              className="flex items-center justify-center gap-2  w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
             <Package size={18} /> My Orders
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center justify-center gap-2 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              <Heart size={18}/>Wishlist
            </Link>

          </div>

          <button className="mt-4 w-full border py-2 rounded hover:bg-gray-100">
            Edit Profile
          </button>
        </div>

        
        <div className="md:col-span-2 space-y-4">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Personal Information</h3>

            <p>
              <strong>Phone:</strong>{" "}
              {user?.phone && user.phone !== "0"
                ? user.phone
                : "Not provided"}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {user?.address && user.address !== "Not provided"
                ? user.address
                : "Not provided"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Account</h3>

            <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MyProfile;