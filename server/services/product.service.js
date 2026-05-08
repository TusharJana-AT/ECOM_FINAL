import { Product } from "../models/index.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id) => {
   const product = await Product.findByPk(id);

   if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
   }

   return product;
};

export const updateProduct=async(id,data)=>{
    const [updated]= await Product.update(data,{
        where:{id}
    })
    if (!updated) {
      const err=new Error("Not Updated")
      err.statusCode=400
      throw err
    }

  return await Product.findByPk(id);
}

export const deleteProduct=async(id)=>{
    const deleted= await Product.destroy({
        where:{id}
    })
    if (!deleted) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
   }
   return true
}