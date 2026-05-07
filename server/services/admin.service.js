import Order from "../models/Order.model.js";
import OrderItem from "../models/OrderItem.model.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

export const getDashboardStats = async () => {
  const totalOrders = await Order.count();

  const orders = await Order.findAll();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  const totalUsers = await User.count();

  return {
    totalOrders,
    totalRevenue,
    totalUsers,
  };
};

export const getOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "image"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const changeOrderStatus = async (id, status) => {
  const order = await Order.findByPk(id);

  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }

  if (order.status === "delivered") {
    const err = new Error("Delivered order cannot be updated");
    err.statusCode = 400;
    throw err;
  }

  order.status = status;

  if (status === "delivered") {
    order.deliveredAt = new Date();
  }

  await order.save();

  return order;
};

export const changePaymentStatus = async (id, paymentStatus) => {
  const order = await Order.findByPk(id);

  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }

  order.paymentStatus = paymentStatus;

  await order.save();

  return order;
};

export const getUsers = async () => {
  return await User.findAll();
};

export const removeUser = async (id) => {
  const deleted = await User.destroy({
    where: { id },
  });

  if (!deleted) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return true;
};

export const changeUserRole = async (id, data) => {
  const [updated] = await User.update(data, {
    where: { id },
  });

  if (!updated) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return await User.findByPk(id);
};