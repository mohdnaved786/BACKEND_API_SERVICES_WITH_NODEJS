// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied. No token provided." });
//   }

//   try {
//     const secretKey = process.env.JWT_SECRET || "defaultsecret";
//     const decoded = jwt.verify(token, secretKey);

//     // store in req.user so routes can access user details
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // store user info for next handlers
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
