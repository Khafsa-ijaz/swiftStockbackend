import express from "express"
import { dtoValidation } from "../middleware/dtoMiddlware";
import { CreateProduct, DeleteProduct, GetAllProduct, UpdateProduct } from "../controllers/product.controllers";
import { Product } from "../dtos/product.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
const ProductRouter=express.Router();
/**
 * @swagger
 * /api/admin/product/add:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - sku
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "iPhone 15"
 *               sku:
 *                 type: string
 *                 example: "IPH-15-001"
 *               price:
 *                 type: number
 *                 example: 1200
 *               stock:
 *                 type: number
 *                 example: 20
 *               categoryId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
ProductRouter.post("/add",AuthMiddlleware,dtoValidation(Product),CreateProduct);
/**
 * @swagger
 * /api/admin/product/allproducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       401:
 *         description: Unauthorized
 */
ProductRouter.get("/allproducts",AuthMiddlleware,GetAllProduct);
/**
 * @swagger
 * /api/admin/product/update/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
ProductRouter.put("/update/:id",AuthMiddlleware,dtoValidation(Product),UpdateProduct);
/**
 * @swagger
 * /api/admin/product/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
ProductRouter.delete("/:id",AuthMiddlleware,DeleteProduct);
export default ProductRouter;