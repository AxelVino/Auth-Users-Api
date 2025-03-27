import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/usersTypes";
import jwt from "jsonwebtoken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email }: User = req.body;
    const userExists = await userService.findUsersByEmail(email);
    if (userExists) res.status(400).json({ message: "Email already exists!" });

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const jwtSecret = process.env.JTW_SECRET as string;
  try {
    const { email, password }: User = req.body;
    const user = await userService.findUsersByEmail(email);

    if (user) {
      const comparePass = await user?.comparePassword(password);

      if (!comparePass) {
        res.status(400).json({ message: "invalid user or password" });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          jwtSecret,
          { expiresIn: "1h" }
        );
        res.json(token);
      }
    } else {
      res.status(400).json({ message: "invalid user or password" });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
