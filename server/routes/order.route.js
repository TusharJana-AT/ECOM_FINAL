import { Router } from "express";
import { createOrder, getOrder } from "../controllers/order.controller.js";
import { isAdmin, verifyToken } from "../middleware/auth.middleware.js";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "../controllers/admin.controller.js";
import { validate } from "../middleware/validations.middleware.js";
import { createOrderValidation } from "../validations/order.validation.js";

const OrderRouter = Router();

OrderRouter.post("/", verifyToken, validate(createOrderValidation),createOrder);

OrderRouter.get("/",verifyToken,getOrder)


OrderRouter.get("/admin", verifyToken, isAdmin, getAllOrders);
OrderRouter.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);
OrderRouter.put("/:id/paymentStatus", verifyToken, isAdmin, updatePaymentStatus);
export default OrderRouter;