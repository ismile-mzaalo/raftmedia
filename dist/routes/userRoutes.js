"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// auth route  (requires authentication and validations)
router.post("/login", validationMiddleware_1.loginUserInput, validationMiddleware_1.checkValidationResult, authController_1.loginUser);
// Public routes
router.post("/create", validationMiddleware_1.validateUserInput, validationMiddleware_1.checkValidationResult, userController_1.createUser);
router.get("/", userController_1.getUsers);
router.get("/:id", userController_1.getUserById);
// Protected route (requires authentication)
router.put("/update/:id", authMiddleware_1.protect, validationMiddleware_1.validateUserInput, validationMiddleware_1.checkValidationResult, userController_1.updateUser);
router.delete("/delete/:id", authMiddleware_1.protect, userController_1.deleteUser);
exports.default = router;
