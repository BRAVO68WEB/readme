import { Hono } from "hono";
import UserController from "../controller/user.controller";
import AuthService from "../services/auth.service";

const user = new Hono();
const userController = new UserController();
const authService = new AuthService();

user.get("/", userController.getAllUsers);
user.get("/me", authService.mid(), userController.me);
user.get("/:username", userController.getUser);
user.patch("/", userController.updateUser);
user.post("/login", userController.loginUser);

console.log("↗️, Loaded User Routes!");

export { user };
