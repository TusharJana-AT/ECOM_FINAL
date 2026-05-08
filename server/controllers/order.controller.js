

import { messages } from "../messages/index.js";
import { createOrderService, getOrdersService } from "../services/order.service.js";
import { response } from "../utils/response.util.js";

export const createOrder = async (req, res, next) => {
  try {
    const result = await createOrderService(req.user.id, req.body);
          console.log("OOHHHH",res.data);
    // res.status(201).json({
    //   success: true,
    //   message: "Order placed successfully",
    //   orderId: result.orderId,
    // });

    return response(res,{
      statusCode:201,
      message:messages.order.ORDER_SUCCESS,
      data:result.orderId
    })
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   message: err.message,
    // });
    return next(err)
  }
};



export const getOrder = async (req, res,next) => {
  try {
    const orders=await getOrdersService(req.user.id)

    // res.json(orders);
    return response(res,{
      statusCode:200,
      data:orders
    })
  } catch (err) {
    // res.status(500).json({ message: err.message });
    return next(err)
  }
};

