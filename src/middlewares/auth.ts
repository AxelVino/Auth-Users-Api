import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { NextFunction, Request, Response } from "express";
import { IUserRepository, IUserService } from "../types/usersTypes";
import { permissions, Method } from "../types/PermissionsTypes";
import { validateAccess, validateRefresh } from "@utils/validateToken";
import { generateAccessToken } from "../utils/generateToken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  //const jwtSecret = process.env.JTW_SECRET as string;
  //const token = req.headers.authorization?.replace(/^Bearer\s+/, "") as string;

  const decoded = validateAccess(req);

  //const verify = jwt.verify(token, jwtSecret) as User;
  const getUser = await userService.findUsersById(decoded.id);
  if (!getUser) {
    return next(new Error("User not found!"));
  }

  req.currentUser = getUser;

  next();
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = validateRefresh(req);
    const user = await userService.findUsersById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = generateAccessToken(user);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 5 * 60 * 1000, // 5 minutos
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    next(err);
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
