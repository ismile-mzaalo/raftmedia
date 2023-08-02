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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
//@desc register new user
//@route POST api/v1/users/create
//@access public
exports.createUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400); //bad request
        throw new Error("User already exists");
    }
    const user = new userModel_1.default({ username, email, password });
    yield user.save();
    res.status(201).json({ message: "User created successfully", user });
}));
//@desc get all users sorting and pagination
//@route GET api/v1/users
//@access public
exports.getUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const sortBy = req.query.sortBy || "username";
    const skip = (page - 1) * limit;
    const users = yield userModel_1.default.find({}).sort(sortBy).skip(skip).limit(limit);
    const totalCount = yield userModel_1.default.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ users, totalCount, totalPages, currentPage: page });
}));
//@desc get user by id
//@route GET api/v1/users/:id
//@access public
exports.getUserById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json(user);
}));
//@desc update user by id
//@route PUT api/v1/users/:id
//@access protect
exports.updateUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.id;
    if (userId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        res.status(404);
        throw new Error("User not Authorised!");
    }
    const { username, email, password } = req.body;
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    yield user.save();
    res.json({ message: "User updated successfully", user });
}));
//@desc Delete user by id
//@route DELETE api/v1/users/:id
//@access protect
exports.deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = req.params.id;
    if (userId !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
        res.status(404);
        throw new Error("User not Authorised!");
    }
    const user = yield userModel_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not Found");
    }
    res.json({ message: "User deleted successfully", user });
}));
