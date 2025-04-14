import { User } from "../types/usersTypes";
import jwt from "jsonwebtoken";
import { JWT_REMO } from "./env";
import { JWT_ROMULUS } from "./env";

function generateAccessToken(user: User) {
  return jwt.sign({ id: user.id }, JWT_REMO, { expiresIn: "5m" });
}

function generateRefreshToken(user: User) {
  return jwt.sign({ id: user.id }, JWT_ROMULUS, { expiresIn: "7d" });
}

export { generateRefreshToken };
export { generateAccessToken };
