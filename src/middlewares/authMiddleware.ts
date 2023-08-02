import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncHandler";
import User from "../models/userModel";

interface IDecode {
  _id?: any;
  username?: string;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
  __v?: any;
}

interface RequestWithUserRole extends Request {
  user?: IDecode;
}

const protect = asyncErrorHandler(
  async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "raftlabs"
        );

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        throw new Error("Not Authorized, token failed");
      }
    } else {
      throw new Error("No token found");
    }
  }
);

export { protect };
