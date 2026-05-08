import { useEffect, useState } from "react";

import { getAllOrders, updateDeliveryStatus, updatePaymentMode } from "../../api/adminApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.data);
      console.log("FETCH", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      await updatePaymentMode(id,paymentStatus)
      // fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };
  const updateStatus = async (id, status) => {
    try {
      await updateDeliveryStatus(id,status)
      console.log("Status", status);
      if (status === "delivered") {
        await updatePaymentStatus(id, "paid");

      }
      fetchOrders(); 
    } catch (err) {
      console.error(err);
    }
  };


  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 mb-4 shadow rounded">
          <div className="flex justify-between">
            <p>
              <b>Order ID:</b> {order.id}
            </p>
            <p>
              <b>Total:</b> ₹ {order.totalPrice}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {/* Items */}
          <div className="mt-2">
            {order.OrderItems?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.Product?.name} x {item.quantity}
                </span>
                <span>₹ {item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span>Status:</span>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              disabled={order.status === "delivered"} // 
              className={`border p-1 rounded ${
                order.status === "delivered"
                  ? "bg-gray-200 cursor-not-allowed"
                  : ""
              }`}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div>
            Delieverd AT : {order.deliveredAt} 
          </div>
          <div className="my-3 flex items-center gap-3">
            <span>Payment : </span>

            
            <span className="text-green-400">{order.paymentStatus}</span>
          </div>
          <div>
            <span>Payment Method : </span>
            <span> {order.paymentMethod}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
