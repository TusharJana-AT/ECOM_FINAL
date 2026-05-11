import { Router } from "express";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const reviewRouter = new Router()

reviewRouter.post('/add-review/:productId',verifyToken,addReview)
reviewRouter.get('/get-review/:productId',verifyToken,getReview)

reviewRouter.put('/edit-review/:reviewId',verifyToken,updateReview)
reviewRouter.delete('/remove-review/:reviewId',verifyToken,deleteReview)

export default reviewRouter