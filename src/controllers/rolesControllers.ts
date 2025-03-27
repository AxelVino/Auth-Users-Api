import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/RolesServices";
import { Request, Response } from "express";
import { IRolesRepository, IRolesService, Roles } from "types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const findRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await rolesService.findRoles();
    if (roles.length == 0) res.status(404).json({ message: "no users found." });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const findRolesById = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.findRolesById(req.params.id);
    if (!roles) res.status(404).json({ message: "Not role found." });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const createRoles = async (req: Request, res: Response) => {
  try {
    const newRoles: Roles = req.body;
    const result = await rolesService.createRoles(newRoles);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
  return;
};

export const updateRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.updateRoles(req.params.id, req.body);
    if (!roles) res.status(404).json({ message: "Not role found." });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};

export const deleteRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.deleteRoles(req.params.id);
    if (!roles) res.status(404).json({ message: "Not role found." });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
  return;
};
