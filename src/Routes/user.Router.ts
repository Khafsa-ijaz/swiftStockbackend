import express from "express";
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../controllers/user.controllers";
import { dtoValidation } from "../middleware/dtoMiddlware";
import { UserDto } from "../dtos/user.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
import { PermissionMiddleware } from "../middleware/permission.middleware";
import { LoginUser } from "../controllers/login.controllers";

export const UserRouter = express.Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/admin/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
UserRouter.post("/login", LoginUser);

/**
 * @swagger
 * /api/admin/user/create:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userRole:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       201:
 *         description: User created successfully
 */
UserRouter.post("/create",AuthMiddlleware, PermissionMiddleware("user:create"), dtoValidation(UserDto), CreateUser);
 /**
 * @swagger
 * /api/admin/user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userRole:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
UserRouter.put("/:id", AuthMiddlleware, PermissionMiddleware("user:update"), dtoValidation(UserDto), UpdateUser);

/**
 * @swagger
 * /api/admin/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
UserRouter.delete("/:id", AuthMiddlleware, PermissionMiddleware("user:delete"), DeleteUser);

/**
 * @swagger
 * /api/admin/user/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users fetched successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.get("/users", AuthMiddlleware, PermissionMiddleware("user:view"), GetAllUsers);

/**
 * @swagger
 * /api/admin/user/{id}:
 *   get:
 *     summary: Get single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

UserRouter.get("/:id", AuthMiddlleware, PermissionMiddleware("user:view"), GetUser);