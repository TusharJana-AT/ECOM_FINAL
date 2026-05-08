import { Router } from "express";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const reviewRouter = new Router()

reviewRouter.post('/add-review',verifyToken,addReview)
reviewRouter.get('/get-review/:id',verifyToken,getReview)

reviewRouter.put('/edit-review/:id',verifyToken,updateReview)
reviewRouter.delete('/remove-review/:id',verifyToken,deleteReview)

export default reviewRouter