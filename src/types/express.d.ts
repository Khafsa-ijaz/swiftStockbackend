
export {};

declare global {
  namespace Express {
    interface Request {
      // Adjust the properties to match your user object
      user?: {
        id: number;
        role: string;
        // add other fields if needed
      };
      
    }
    interface JwtPayload {
  id: number;
  role: string;
}
  }
}