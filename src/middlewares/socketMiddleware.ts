import asyncErrorHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { io } from "../server";

interface IDecode {
  _id?: any;
  username?: string;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
  __v?: any;
}

interface SocketWithUserRole extends Socket {
  user?: IDecode;
}

const socketioHandshake = async (
  socket: SocketWithUserRole,
  next: (err?: any) => void
) => {
  try {
    console.log("---in");
    const token = socket.handshake.auth.token;

    console.log("---------token", token);

    const decoded: any = jwt.verify(token, "raftlabs");
    console.log("-------decoded", decoded);

    if (!decoded) {
      return next(new Error("Invalid token"));
    }

    socket.user = decoded;

    return next();
  } catch (error) {
    return next(error);
  }
};

const socketEvent = (socket: SocketWithUserRole) => {
  console.log("User Connected");
  socket.join(socket.user?._id);

  socket.on("userUpdate", (user) => {
    // Save the user data to the database, then emit the event to the room
    io.to(socket.user?._id).emit("userUpdated", user);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

export { socketioHandshake, socketEvent };
