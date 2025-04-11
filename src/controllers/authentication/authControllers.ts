import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/usersTypes";
import jwt from "jsonwebtoken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  const { email }: User = req.body;
  const userExists = await userService.findUsersByEmail(email);
  if (userExists) throw new Error("Email already exists!");

  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response) => {
  const jwtSecret = process.env.JTW_SECRET as string;
  const { email, password }: User = req.body;
  const user = await userService.findUsersByEmail(email);

  if (user) {
    const comparePass = await user?.comparePassword(password);

    if (!comparePass) {
      throw new Error("Invalid user or password!");
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        jwtSecret,
        { expiresIn: "5m" }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        })
        .json({
          email: user.email,
          username: user.username,
          name: user.name,
          id: user.id,
        });
    }
  } else {
    throw new Error("Invalid user or password!");
  }
};

export const authToken = async (req: Request, res: Response) => {
  res.json({
    name: req.currentUser.name,
    username: req.currentUser.username,
    email: req.currentUser.email,
    id: req.currentUser.id,
  });
};
