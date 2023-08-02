import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  validateUserInput,
  checkValidationResult,
  loginUserInput,
} from "../middlewares/validationMiddleware";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { loginUser } from "../controllers/authController";

const router = Router();

// auth route  (requires authentication and validations)
router.post("/login", loginUserInput, checkValidationResult, loginUser);

// Public routes
router.post("/create", validateUserInput, checkValidationResult, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

// Protected route (requires authentication)
router.put(
  "/update/:id",
  protect,
  validateUserInput,
  checkValidationResult,
  updateUser
);
router.delete("/delete/:id", protect, deleteUser);

export default router;
