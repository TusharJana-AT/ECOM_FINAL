import { messages } from "../messages/index.js";

import * as ProductServices from "../services/product.service.js";
import { response } from "../utils/response.util.js";
//create
const BASE_URL = process.env.BASE_URL;
export const createProduct = async (req, res,next) => {
  try {
    
    const imagePath = req.file
      ? `${BASE_URL}/uploads/${req.file.filename}`
      : null;

    const productData = {
      ...req.body,
      image: imagePath,
    };
    const product = await ProductServices.createProduct(productData);

    // res.status(201).json({
    //   success: true,
    //   message: "Product created successfully",
    //   data: product,
    // });
    return response(res,{
      statusCode:201,
      message:messages.product.PRODUCT_CREATED,
      data:product
    })
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message,
    // });
    return next(err)
  }
};

//get

export const getAllProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.getProducts();
    // res.status(200).json(product);
    return response(res,{
      statusCode:200,
      data:product
    })
  } catch (err) {
    // res.status(500).json({ message: error.message });
    return next(err)
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.getProductById(req.params.id);
    
    return response(res,{
      statusCode:200,
      data:product
    })
  } catch (err) {
    // res.status(500).json({ message: error.message });
    return next(err)
  }
};

//update

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;


    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const updated = await ProductServices.updateProduct(id, updateData);

    // res.status(200).json(updated);
    return response(res,{
      statusCode:200,
      data:updated
    })

  } catch (err) {
    // res.status(500).json({ message: error.message });
    return next(err)
  }
};

//delete

export const deleteProduct = async (req, res, next) => {
  try {
     await ProductServices.deleteProduct(req.params.id);

    

    // res.status(200).json({
    //   success: true,
    //   message: "Product deleted successfully",
    // });
    return response(res,{
      statusCode:200,
      message:messages.product.PRODUCT_DELETED
    })
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
    return next(err)
  }
};
