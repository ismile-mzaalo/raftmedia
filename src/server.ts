import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import { connectDB } from "./config/db";
import connectRedis from "./config/redisCon";
import userRoutes from "./routes/userRoutes";
import { socketioHandshake, socketEvent } from "./middlewares/socketMiddleware";

dotenv.config();
connectDB();
connectRedis();

const app = express();
const server = http.createServer(app); // Create an HTTP server instance
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.json()); //body parsing

app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount routes
app.use("/api/v1/users", userRoutes);

//Error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT: any = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`[Server]: Running on Port ${PORT}`));

io.on("connection", function (socket) {
  console.log("-- User Connected --");

  // socket.join(socket.user?._id);

  // socket.on("userUpdate", (user) => {
  //   io.to(socket.user?._id).emit("userUpdated", user);
  // });

  socket.on("disconnect", () => {
    console.log("-- User disconnected --");
  });
});
