import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">
          Order #{order.id}
        </h2>

        <div>
          <span className="text-sm">
            ORDER STATUS :
          </span>

          <span
            className={`text-sm font-medium ${
              order.status === "delivered"
                ? "text-green-600"
                : order.status === "pending"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {" "}
            {order.status}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Ordered:{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      {order.status === "delivered" && (
        <p className="text-xs text-gray-500">
          Delivered:{" "}
          {new Date(order.deliveredAt).toLocaleString()}
        </p>
      )}

      <div className="flex justify-between mt-2 text-sm">
        <p className="font-medium">
          Total: ₹ {order.totalPrice.toFixed(2)}
        </p>

        <p>
          Payment:{" "}
          {order.paymentMethod || "N/A"}
        </p>
      </div>

      <div className="flex justify-between mt-2 text-sm">
        <Link
          to={`/orders/${order.id}`}
          state={{ order }}
          className="text-blue-500 text-sm"
        >
          View Details
        </Link>

        <p>
          Status:{" "}
          {order.paymentStatus || "N/A"}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {order.OrderItems?.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border-t pt-3"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded border"
            />

            <div className="flex-1">
              <p className="font-medium">
                {item.productName}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-medium">
              ₹ {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;