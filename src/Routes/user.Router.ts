import express from "express";
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../controllers/user.controllers";
import { dtoValidation } from "../middleware/dtoMiddlware";
import { UserDto } from "../dtos/user.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
import { RoleCheck } from "../middleware/rolemiddleware";
import { LoginUser } from "../controllers/login.controllers";
const UserRouter=express.Router()
UserRouter.post("/create",dtoValidation(UserDto),CreateUser);
UserRouter.post("/login",LoginUser);
UserRouter.get("/:id",AuthMiddlleware,RoleCheck("Admin"),GetUser);
UserRouter.put("/update",AuthMiddlleware,RoleCheck("Admin"),dtoValidation(UserDto),UpdateUser);
UserRouter.delete("/:id",AuthMiddlleware,RoleCheck("Admin"),DeleteUser);
UserRouter.get("/users",AuthMiddlleware,RoleCheck("Admin"),GetAllUsers);

export default UserRouter;