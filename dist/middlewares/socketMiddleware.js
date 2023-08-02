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
exports.socketEvent = exports.socketioHandshake = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const socketioHandshake = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("---in");
        const token = socket.handshake.auth.token;
        console.log("---------token", token);
        const decoded = jsonwebtoken_1.default.verify(token, "raftlabs");
        console.log("-------decoded", decoded);
        if (!decoded) {
            return next(new Error("Invalid token"));
        }
        socket.user = decoded;
        return next();
    }
    catch (error) {
        return next(error);
    }
});
exports.socketioHandshake = socketioHandshake;
const socketEvent = (socket) => {
    var _a;
    console.log("User Connected");
    socket.join((_a = socket.user) === null || _a === void 0 ? void 0 : _a._id);
    socket.on("userUpdate", (user) => {
        var _a;
        // Save the user data to the database, then emit the event to the room
        server_1.io.to((_a = socket.user) === null || _a === void 0 ? void 0 : _a._id).emit("userUpdated", user);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
};
exports.socketEvent = socketEvent;
