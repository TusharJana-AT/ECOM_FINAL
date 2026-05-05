

import { createOrderService, getOrdersService } from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: result.orderId,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



export const getOrder = async (req, res) => {
  try {
    const orders=await getOrdersService(req.user.id)

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

