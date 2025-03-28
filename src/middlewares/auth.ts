import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository, IUserService, User } from "../types/usersTypes";
import { permissions, Method } from "../types/PermissionsTypes";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.JTW_SECRET as string;
  const token = req.headers.authorization?.replace(/^Bearer\s+/, "") as string;

  try {
    const verify = jwt.verify(token, jwtSecret) as User;

    const getUser = await userService.findUsersById(verify.id);
    if (getUser) {
      req.currentUser = getUser;
    } else {
      res.status(400);
    }
    next();
  } catch (error: any) {
    console.log("error :>> ", error);
    res.status(401).send(error.message);
  }
};

export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentUser, method, path } = req;
  const { roles } = currentUser;

  const currentModule = path.replace(/^\/([^\/]+).*/, "$1");

  const findMethod = permissions.find(
    (x) => x.method == Method[method as keyof typeof Method]
  );
  if (
    !findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)
  ) {
    findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
  }

  //const rolesPermissions = roles?.map(role => role.permissions );
  //const flatPermissions = rolesPermissions?.flat();
  //const mergedPermissions = [new Set(flatPermissions)];

  const mergedRolesPermissions = [
    ...new Set(roles?.flatMap((x) => x.permissions)),
  ];

  let userPermissions: string[] = [];

  if (currentUser.permissions?.length != 0) {
    userPermissions = currentUser.permissions!;
  } else {
    userPermissions = mergedRolesPermissions;
  }

  const permissionsGranted = findMethod?.permissions.find((x) =>
    userPermissions.includes(x)
  );
  if (permissionsGranted) {
    next();
  } else {
    res.status(401).send("Unauthorized!");
  }
};
