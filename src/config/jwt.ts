import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "raftlabs";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "30d" });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };
