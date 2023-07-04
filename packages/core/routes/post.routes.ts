import { Hono } from "hono";

import PostController from "../controller/post.controller";
import AuthService from "../services/auth.service";

const post = new Hono();
const postController = new PostController();
const authService = new AuthService();

post.get("/", postController.getAllPosts);
post.get("/:id", postController.getPost);
post.post("/", authService.mid(), postController.createPost);
post.patch("/:id", authService.mid(), postController.updatePost);
post.delete("/:id", authService.mid(), postController.deletePost);

console.log("↗️, Loaded Post Routes!");

export { post };
