import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validations.middleware.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validations.js";
import { upload } from "../middleware/upload.js";

const productRouter = Router();

//public
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getSingleProduct);

//admin
productRouter.post("/", verifyToken, isAdmin,upload.single("image"), validate(createProductSchema), createProduct);
productRouter.put("/:id", verifyToken, isAdmin,upload.single("image"), validate(updateProductSchema), updateProduct);
productRouter.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default productRouter;