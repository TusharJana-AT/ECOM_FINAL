import { Product, User, WishList } from "../models/index.js";

export const addWishlist = async (userId, productId) => {
  return await WishList.create({
    userId,
    productId,
  });
};

export const getWishList = async (userId) => {
  return await User.findByPk(userId, {
    include: [
      {
        model: Product,
        as: "wishlist",
        attributes: ["id", "name", "price", "image"],
      },
    ],
  });
  
};

// SELECT Products.id, Products.name, Products.price, Products.imageUrl
// FROM Products
// JOIN WishLists ON Products.id = WishLists.productId
// WHERE WishLists.userId = userId;

export const removeWish = async (userId, productId) => {
  const deleted = await WishList.destroy({
    where: { userId, productId },
  });

  if (!deleted) {
    const err = new Error("Wishlist item not found");
    err.statusCode = 404;
    throw err;
  }

  return true;
};
