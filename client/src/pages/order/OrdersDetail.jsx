// import { useLocation } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// const OrderDetail = () => {
//   const { state } = useLocation();
//   const order = state?.order;
//   const { user } = useAuth();
//   if (!order) return <p>No order data</p>;

//   return (
//     <div className=" flex justify-between">
//       <div className="max-w-4xl mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>

//         <p>Status: {order.status}</p>
//         <p>Total: ₹ {order.totalPrice}</p>
//         <p>Payment: {order.paymentMethod}</p>
//         <p>Address: {order.shippingAddress}</p>

//         <div className="mt-4 space-y-3">
//           {order.OrderItems.map((item) => (
//             <div key={item.id} className="flex gap-4 border p-2 rounded">
//               <img src={item.imageUrl} className="w-16 h-16 object-cover" />

//               <div>
//                 <p>{item.productName}</p>
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="font-semibold mt-4 mb-2">Delivery Info</h2>

//         <p>Address: {order.shippingAddress || "Not provided"}</p>

//         <h2 className="font-semibold mt-4 mb-2">User Info</h2>

//         <p>Name: {user?.name}</p>
//         <p>Email: {user?.email}</p>
//         <p>Phone: {user?.phone || "Not provided"}</p>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;


import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const OrderDetail = () => {
  const { state } = useLocation();
  const order = state?.order;
  const { user } = useAuth();

  if (!order) return <p className="p-6">No order data</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">


      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          Order #{order.id}
        </h1>

        {/* Status + Info */}
        <div className="mb-4 space-y-1">
          <p>
            Status:{" "}
            <span
              className={`font-medium ${
                order.status === "delivered"
                  ? "text-green-600"
                  : order.status === "pending"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {order.status}
            </span>
          </p>

          <p>Total: ₹ {order.totalPrice}</p>
          <p>Payment: {order.paymentMethod}</p>
        </div>

        <h2 className="font-semibold mb-2">Items</h2>

        <div className="space-y-3">
          {order.OrderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-3 rounded-lg"
            >
              <img
                src={item.image}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-medium">₹ {item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/*  User + Delivery  */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 h-fit">

        <div>
          <h2 className="font-semibold mb-2">Delivery Info</h2>
          <p className="text-md text-gray-90000">
            <span className="font-semibold text-black mr-2">SHIPPING ADDRESS</span>{order.shippingAddress || "Not provided"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">User Info</h2>

          <p className="text-sm">
            <span className="font-medium">Name:</span> {user?.name}
          </p>

          <p className="text-sm">
            <span className="font-medium">Email:</span> {user?.email}
          </p>

          <p className="text-sm">
            <span className="font-medium">Phone:</span>{" "}
            {user?.phone && user.phone !== "0"
              ? user.phone
              : "Not provided"}
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrderDetail;