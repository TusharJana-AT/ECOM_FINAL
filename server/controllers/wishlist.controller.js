
import * as WishListServices from "../services/wishlist.service.js";
import { response } from "../utils/response.util.js";
import { messages } from "../messages/index.js";

export const addWishlist = async (req, res, next) => {
  try {
    const data = await WishListServices.addWishlist(
      req.user.id,
      req.body.productId
    );

    // res.status(201).json({
    //   success: true,
    //   message: "Added to wishlist",
    //   data
    // });

    return response(res,{
      statusCode:201,
      message:messages.wishlist.WISHLIST_SUCCESS,
      data
    })

  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
    return next(err)
  }
};

export const removeWishList = async (req, res, next) => {
  try {
    await WishListServices.removeWish(
      req.user.id,
      req.params.productId
    );

    // res.status(200).json({
    //   success: true,
    //   message: "Removed from wishlist"
    // });

    return response(res,{
      statusCode:200,
      message:messages.wishlist.WISHLIST_REMOVED
    })

  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
    return next(err)
  }
};


export const getWishList = async (req, res, next) => {
  try {
    const data = await WishListServices.getWishList(req.user.id);
    // res.status(200).json(data);
    return response(res,{
      statusCode:200,
      data
    })
  } catch (err) {
    // res.status(500).json({ message: error.message });
    return next(err)
  }
};
