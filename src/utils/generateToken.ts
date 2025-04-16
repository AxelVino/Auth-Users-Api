import { User } from "../types/usersTypes";
import jwt from "jsonwebtoken";
import { JWT_REMO, JWT_ROMULO } from "./env";

function generateAccessToken(user: User) {
  return jwt.sign({ id: user.id }, JWT_REMO, { expiresIn: "5m" });
}

function generateRefreshToken(user: User) {
  return jwt.sign({ id: user.id }, JWT_ROMULO, { expiresIn: "7d" });
}

export { generateRefreshToken };
export { generateAccessToken };
