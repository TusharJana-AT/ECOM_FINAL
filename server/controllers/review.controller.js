
import { messages } from "../messages/index.js";
import * as ReviewServices from "../services/review.service.js";
import { response } from "../utils/response.util.js";


export const addReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId=req.params.productId
    const { rating, comment } = req.body;

    const review = await ReviewServices.createReview({
      userId,
      productId,
      rating,
      comment,
    });

    return response(res, {
      statusCode: 200,
      message: messages.review.REVIEW_ADD,

      data: review,
    });
  } catch (err) {
    return next(err);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const review = await ReviewServices.findReview(productId);
    return response(res, {
      statusCode: 200,
      data: review,
    });
  } catch (err) {
    return next(err);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    
    const updated = await ReviewServices.updateReview({
      reviewId,
      userId,
      rating,
      comment,
    });

    return response(res, {
      statusCode: 200,
      message: messages.review.REVIEW_UPDATED,
      data: updated,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const del = await ReviewServices.deleteReview({ reviewId, userId });
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
    });
  } catch (err) {
    return next(err);
  }
};
