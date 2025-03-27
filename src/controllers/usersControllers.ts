import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/usersTypes";

//Injeccion de dependencia

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.findUsers();
    if (users.length === 0)
      res.status(404).json({ message: "no users found." });

    res.json(users);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findUsersById = async (_req: Request, res: Response) => {
  try {
    const users = await userService.findUsersById(_req.params.id);
    if (!users) res.status(404).json({ message: "Not user found." });

    res.json(users);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.updateUser(req.params.id, req.body);
    if (!users) res.status(404).json({ message: "Not user found." });

    res.json(users);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.deleteUser(req.params.id);
    if (!users) res.status(404).json({ message: "Not user found." });

    res.json(users);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};
