import { Order, OrderItem, Product } from "../models/index.js";
import { sequelize } from "../config/db.js";

export const createOrderService = async (userId, data) => {
  const t = await sequelize.transaction();

  try {
    const { items, paymentMethod, shippingAddress } = data;

    if (!items || items.length === 0) {
      throw new Error("No items in order");
    }

    if (!paymentMethod || !shippingAddress) {
      throw new Error("Missing payment or address");
    }

    let totalPrice = 0;

    const productIds = items.map((i) => i.productId);

    const products = await Product.findAll({
      where: { id: productIds },
      transaction: t,
    });

    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} is out of stock`);
      }

      totalPrice += product.price * item.quantity;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        productName: product.name,
        image: product.image,
      };
    });

    const order = await Order.create(
      {
        userId,
        totalPrice,
        paymentMethod,
        shippingAddress,
        paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
        status: "pending",
      },
      { transaction: t }
    );

    const finalItems = orderItemsData.map((item) => ({
      ...item,
      orderId: order.id,
    }));

    await OrderItem.bulkCreate(finalItems, { transaction: t });

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    await t.commit();

    return {
      orderId: order.id,
    };
  } catch (err) {
    await t.rollback();
    throw err; 
  }
};

export const getOrdersService = async (userId) => {
  return await Order.findAll({
    where: { userId },
    include: [{ model: OrderItem }],
    order: [["createdAt", "DESC"]],
  });
};