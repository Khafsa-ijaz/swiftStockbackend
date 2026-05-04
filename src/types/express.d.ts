import { Admin } from "typeorm";

export {};

declare global {
  namespace Express {
    interface Request {
      // Adjust the properties to match your user object
      user?: {
        id: number;
        role: "Admin"|"Staff";
        // add other fields if needed
      };
      
    }
    interface JwtPayload {
  id: number;
   role: "Admin"|"Staff";
}
  }
}