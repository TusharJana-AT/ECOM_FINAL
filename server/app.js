import express from 'express'
import productRouter from './routes/product.route.js'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import orderRouter from "./routes/order.route.js";
import adminRouter from './routes/admin.route.js';
import wishRouter from './routes/wishlist.route.js';
import { response } from './utils/response.util.js';
import { messages } from './messages/index.js';
import reviewRouter from './routes/review.route.js';

const app=express()

app.use(express.json())
app.use(cors())

app.use('/uploads',express.static('uploads'))

app.use('/api/products',productRouter)

app.use('/api/auth',authRouter)
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);

app.use("/api/wishlist",wishRouter)
app.use("/api/reviews",reviewRouter)

app.use((err, req, res, next) => {
  console.log(err);

  return response(res, {
    statusCode: err.statusCode || 500,
    message: err.message || messages.general.INTERNAL_SERVER_ERROR,
    error: err,
  });
});


export default app