import { Request, Response, NextFunction } from "express";
import { rolePermissions } from "../rbac/roles.rbac";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: keyof typeof rolePermissions;
  };
}

export const PermissionMiddleware = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userPermissions = rolePermissions[req.user.role];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ message: "Forbidden - no permission" });
    }

    next();
  };
};