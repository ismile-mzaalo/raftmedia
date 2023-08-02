"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationResult = exports.loginUserInput = exports.validateUserInput = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserInput = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
];
exports.loginUserInput = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password required"),
];
const checkValidationResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.checkValidationResult = checkValidationResult;
