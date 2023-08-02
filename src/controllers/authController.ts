import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../config/jwt";
import asyncErrorHandler from "../utils/asyncHandler";

//@desc login user
//@route api/v1/users/login
//@access public
export const loginUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: `Bearer ${generateToken(user._id)}`,
    };

    res.json({ message: "Login successful", data });
  }
);
