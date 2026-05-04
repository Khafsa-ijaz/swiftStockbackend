import express from "express";
import { AuthMiddlleware } from "../middleware/authMiddleware";
import { PermissionMiddleware } from "../middleware/permission.middleware";
import { CategoryController, Getcategory } from "../controllers/category.controllers";
export const CategoryRouter=express.Router();
 /**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management APIs
 */

/**
 * @swagger
 * /api/admin/category/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: All electronic items
 *               sku:
 *                 type: string
 *                 example: CAT-001
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no permission)
 */
CategoryRouter.post("/categories",AuthMiddlleware,PermissionMiddleware("category:create"),CategoryController);
CategoryRouter.get("/getcategory",AuthMiddlleware,PermissionMiddleware("category:view"),Getcategory)