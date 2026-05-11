import { useEffect, useState } from "react";

import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import { getOrders } from "../../api/orderapi";
import OrderCard from "../../components/order/OrderCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data.data);
        console.log("Fetch Orders", res.data.data);
        // console.log("USERS", user);
      } catch (err) {
        setError("Failed to load orders");
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="p-6 text-gray-500">No orders found</p>;
  }

return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        My Orders ({user?.name})
      </h1>

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};

export default MyOrders;
