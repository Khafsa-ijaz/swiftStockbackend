import cors from "cors";
import express from "express";
import {UserRouter} from "./Routes/user.Router";
import OrderRouter from "./Routes/order.Router";
import ProductRouter from "./Routes/product.Router";
import { globalErrorHandler } from "./middleware/globalMiddleware";
import { CategoryRouter } from "./Routes/category.Router";

const app =express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
    
}));
app.use(express.json({limit:"400kb"}));
app.use("/api/admin/user",UserRouter);
app.use("/api/admin/order",OrderRouter);
app.use("/api/admin/product",ProductRouter);
app.use("/api/admin/category",CategoryRouter);
app.use(globalErrorHandler);
export default app;