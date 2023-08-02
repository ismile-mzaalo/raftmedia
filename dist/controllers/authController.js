"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt_1 = require("../config/jwt");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
//@desc login user
//@route api/v1/users/login
//@access public
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
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
        token: `Bearer ${(0, jwt_1.generateToken)(user._id)}`,
    };
    res.json({ message: "Login successful", data });
}));
