import { Router } from "express";
import {
  createRoles,
  deleteRoles,
  findRoles,
  findRolesById,
  updateRoles,
} from "@controllers/rolesControllers";
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from "@controllers/usersControllers";
import {
  loginUser,
  registerUser,
} from "@controllers/authentication/authControllers";
import {
  createArticle,
  deleteArticle,
  findArticleById,
  findArticles,
  updateArticle,
} from "@controllers/articlesControllers";
import { getPermissions, verifyToken } from "@middlewares/auth";
import { checkRoles } from "@middlewares/roles";

const router = Router();

export default () => {
  //Auth Routes
  router.post("/auth/register", checkRoles, registerUser);
  router.post("/auth/login", loginUser);

  //Users Routes
  router.get("/users/", verifyToken, getPermissions, findUsers);
  router.get("/users/:id", verifyToken, getPermissions, findUsersById);
  router.post("/users", verifyToken, getPermissions, checkRoles, createUser);
  router.put("/users/:id", verifyToken, getPermissions, updateUser);
  router.delete("/users/:id", verifyToken, getPermissions, deleteUser);

  //Roles Routes
  router.get("/roles", verifyToken, getPermissions, findRoles);
  router.get("/roles/:id", verifyToken, getPermissions, findRolesById);
  router.post("/roles", verifyToken, getPermissions, createRoles);
  router.put("/roles/:id", verifyToken, getPermissions, updateRoles);
  router.delete("/roles/:id", verifyToken, getPermissions, deleteRoles);

  //Articles routes
  router.get("/articles", findArticles);
  router.get("/article/:id", findArticleById);
  router.post("/article", verifyToken, getPermissions, createArticle);
  router.put("/article/:id", verifyToken, getPermissions, updateArticle);
  router.delete("/article/:id", verifyToken, getPermissions, deleteArticle);

  return router;
};
