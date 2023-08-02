import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import asyncErrorHandler from "../utils/asyncHandler";

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

//@desc register new user
//@route POST api/v1/users/create
//@access public
export const createUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400); //bad request
      throw new Error("User already exists");
    }

    const user: IUser = new User({ username, email, password });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  }
);

//@desc get all users sorting and pagination
//@route GET api/v1/users
//@access public
export const getUsers = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortBy = (req.query.sortBy as string) || "username";

    const skip = (page - 1) * limit;

    const users = await User.find({}).sort(sortBy).skip(skip).limit(limit);

    const totalCount: number = await User.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ users, totalCount, totalPages, currentPage: page });
  }
);

//@desc get user by id
//@route GET api/v1/users/:id
//@access public
export const getUserById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json(user);
  }
);

//@desc update user by id
//@route PUT api/v1/users/:id
//@access protect
export const updateUser = asyncErrorHandler(
  async (req: RequestWithUserRole, res: Response) => {
    const userId: string = req.params.id;

    if (userId !== req.user?._id.toString()) {
      res.status(404);
      throw new Error("User not Authorised!");
    }
    const { username, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    res.json({ message: "User updated successfully", user });
  }
);

//@desc Delete user by id
//@route DELETE api/v1/users/:id
//@access protect
export const deleteUser = asyncErrorHandler(
  async (req: RequestWithUserRole, res: Response) => {
    const userId: string = req.params.id;

    if (userId !== req.user?._id.toString()) {
      res.status(404);
      throw new Error("User not Authorised!");
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not Found");
    }

    res.json({ message: "User deleted successfully", user });
  }
);
