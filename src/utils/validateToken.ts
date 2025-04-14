import { User } from "../types/usersTypes";
import jwt from "jsonwebtoken";
import { JWT_REMO, JWT_ROMULUS } from "../utils/env";
import { Request } from "express";

function validateAccess(req: Request) {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new Error("No authorized!");
  }
  try {
    return jwt.verify(token, JWT_REMO) as User;
  } catch (err) {
    throw new Error("Invalid or expired access token");
  }
}

function validateRefresh(req: Request) {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new Error("No authorized!");
  }
  try {
    return jwt.verify(token, JWT_ROMULUS) as User;
  } catch (err) {
    throw new Error("Invalid or expired access token");
  }
}

export { validateAccess };
export { validateRefresh };
