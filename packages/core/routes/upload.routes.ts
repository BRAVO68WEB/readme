import { Hono } from "hono";

import UploadController from "../controller/upload.controller";
import AuthService from "../services/auth.service";

const upload = new Hono();
const uploadController = new UploadController();
const authService = new AuthService();

upload.post("/", authService.mid(), uploadController.upload);

console.log("↗️, Loaded Post Routes!");

export { upload };
