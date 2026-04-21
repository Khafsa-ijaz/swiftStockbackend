import express from "express"
import { dtoValidation } from "../middleware/dtoMiddlware";
import { CreateProduct, DeleteProduct, GetAllProduct, UpdateProduct } from "../controllers/product.controllers";
import { Product } from "../dtos/product.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
const ProductRouter=express.Router();
ProductRouter.post("/add",AuthMiddlleware,dtoValidation(Product),CreateProduct);
ProductRouter.get("/allproducts",AuthMiddlleware,GetAllProduct);
ProductRouter.put("/update/:id",AuthMiddlleware,UpdateProduct);
ProductRouter.delete("/:id",AuthMiddlleware,DeleteProduct);
export default ProductRouter;