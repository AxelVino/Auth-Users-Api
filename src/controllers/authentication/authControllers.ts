import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/usersTypes";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@utils/generateToken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  const { email }: User = req.body;
  const userExists = await userService.findUsersByEmail(email);
  if (userExists) throw new Error("Email already exists!");

  const newUser = await userService.createUser(req.body);
  res.status(201).json({ message: `User created: ${newUser.username}` });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const user = await userService.findUsersByEmail(email);

  if (user) {
    const comparePass = await user?.comparePassword(password);

    if (!comparePass) {
      throw new Error("Invalid user or password!");
    } else {
      const tokenA = generateAccessToken(user);
      const tokenR = generateRefreshToken(user);
      res.cookie("accessToken", tokenA, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 5 * 60 * 1000,
        path: "/",
      });
      res.cookie("refreshToken", tokenR, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/auth/refresh",
      });
      res.json({
        username: user.username,
      });
    }
  } else {
    throw new Error("Invalid user or password!");
  }
};

export const authToken = async (req: Request, res: Response) => {
  res.json({
    username: req.currentUser.username,
  });
};
