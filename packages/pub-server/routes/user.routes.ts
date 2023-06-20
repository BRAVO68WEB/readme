import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUser)
router.post("/", userController.createUser);
router.patch("/", userController.updateUser)

console.log("Loaded User Routes Successfully!");

export default router;