import User from "../models/User.model.js";
import Review from "../models/Review.model.js";
import Product from "../models/Product.model.js";

export const createReview = async ({ userId, productId, rating, comment }) => {
  const existingReview = await Review.findOne({ where: { userId, productId } });

  if (existingReview) {
    const err = new Error("Review has already been given");
    err.statusCode = 400;
    throw err;
  }

  const product = await Product.findByPk(productId);

  if (!product) {
    const err=new Error("Product not found");
    err.statusCode=400
    throw err
  }

  const review = await Review.create({
    userId,
    productId,
    rating,
    comment,
  });

  await updateProductRating(productId);
  return await Review.findByPk(review.id, {
  include: [{
    model: User,
    attributes: ["id", "name"]
  }]
});
};

export const findReview = async (productId) => {
  const review = await Review.findAll({
    where: { productId },

    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return review;
};

export const updateReview = async ({ id, userId, rating, comment }) => {
  const review = await Review.findByPk(id);

  if (!review) {
    const err = new Error("No Review");
    err.statusCode = 400;
    throw err;
  }

  if (review.userId !== userId) {
    const err = new Error("Not Authorized");
    err.statusCode = 400;
    throw err;
  }

  if (rating !== undefined) review.rating = rating;
if (comment !== undefined) review.comment = comment;

  await review.save();
  await updateProductRating(review.productId);

  return await Review.findByPk(review.id, {
  include: [{
    model: User,
    attributes: ["id", "name"]
  }]
});
};

export const deleteReview = async ({ id, userId }) => {
  const review = await Review.findByPk(id);

  if (!review) {
    const err = new Error("Review not found");
    err.statusCode = 404;
    throw err;
  }

  if (review.userId !== userId) {
    const err = new Error("Unauthorized");
    err.statusCode = 403;
    throw err;
  }

  const productId = review.productId;

  await review.destroy();

  await updateProductRating(productId);

  return true;
};

export const updateProductRating = async (productId) => {
  const reviews = await Review.findAll({
    where: { productId },
  });

  const numReviews = reviews.length;

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / numReviews || 0;

  await Product.update(
    {
      rating: avgRating,
      numReviews,
    },
    {
      where: { id: productId },
    },
  );
};
