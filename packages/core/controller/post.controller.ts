import type { Context } from "hono";

import PostService from "../services/post.service";

export default class PostController extends PostService {
    public getAllPosts = (ctx: Context) => {
        try {
            const posts = this.getPostsS();
            return ctx.json(posts);
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };

    public getPost = (ctx: Context) => {
        try {
            const id = ctx.req.param("id");
            const post = this.getPostS(id);
            return ctx.json(post);
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };

    public createPost = async (ctx: Context) => {
        try {
            const body = await ctx.req.json();
            const user_id = ctx.req.header("user_id") as string;
            const post = await this.createPostS(
                body.title,
                body.content,
                body.tags,
                user_id
            );
            return ctx.json(post);
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };

    public updatePost = async (ctx: Context) => {
        try {
            const id = ctx.req.param("id");
            const body = await ctx.req.json();
            this.updatePostS(id, body);
            return ctx.json({ success: true });
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };

    public deletePost = (ctx: Context) => {
        try {
            const id = ctx.req.param("id");
            this.deletePostS(id);
            return ctx.json({ success: true });
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };
}