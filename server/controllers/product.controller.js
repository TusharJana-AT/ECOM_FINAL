import Product from "../models/Product.model.js";
import * as ProductServices from "../services/product.service.js";
//create

export const createProduct = async (req, res) => {
  try {
    const imagePath = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : null;

    const productData = {
      ...req.body,
      image: imagePath,
    };
    const product = await ProductServices.createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get

export const getAllProduct = async (req, res) => {
  try {
    const product = await ProductServices.getProducts();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductServices.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await ProductServices.updateProduct(id, updateData);

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductServices.deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
