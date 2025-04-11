import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/RolesServices";
import { NextFunction, Request, Response } from "express";
import { IRolesRepository, IRolesService } from "types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const checkRoles = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
  const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];

  const findRoles = await rolesService.findRoles({ name: { $in: role } });
  if (findRoles.length == 0) {
    return next(new Error("Role not found"));
  }

  req.body.roles = findRoles.map((x) => x._id);
  next();
};
