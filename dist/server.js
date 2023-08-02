"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const db_1 = require("./config/db");
const redisCon_1 = __importDefault(require("./config/redisCon"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
(0, db_1.connectDB)();
(0, redisCon_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Create an HTTP server instance
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
app.use(express_1.default.json()); //body parsing
app.get("/", (req, res) => {
    res.send("API is running");
});
// Mount routes
app.use("/api/v1/users", userRoutes_1.default);
//Error middlewares
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`[Server]: Running on Port ${PORT}`));
exports.io.on("connection", function (socket) {
    console.log("-- User Connected --");
    // socket.join(socket.user?._id);
    // socket.on("userUpdate", (user) => {
    //   io.to(socket.user?._id).emit("userUpdated", user);
    // });
    socket.on("disconnect", () => {
        console.log("-- User disconnected --");
    });
});
