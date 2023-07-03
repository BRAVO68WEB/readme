import type { Context } from "hono";

import AuthService from "../services/auth.service";
import UserService from "../services/users.service";

const authService = new AuthService();

export default class UserController extends UserService {
	public getAllUsers = (ctx: Context) => {
		try {
			const users = this.getUsersS();
			return ctx.json(users);
		} catch (error: any) {
			console.log(error);
			return ctx.json({
				success: false,
			});
		}
	};

	public getUser = (ctx: Context) => {
		try {
			const username = ctx.req.param("username");
			const user = this.getUserS(username);
			return ctx.json(user);
		} catch (error: any) {
			console.log(error);
			return ctx.json({
				success: false,
			});
		}
	};

	public updateUser = (ctx: Context) => {
		try {
			const username = ctx.req.param("username");
			const body = ctx.req.json();
			this.updateUserS(username, body);
			return ctx.json({ success: true });
		} catch (error: any) {
			console.log(error);
			return ctx.json({
				success: false,
			});
		}
	};

	public loginUser = async (ctx: Context) => {
		try {
			const body = await ctx.req.json();
			const user = (await this.loginUserS(
				body.username,
				body.password,
			)) as any;
			if (!user) {
				throw new Error("Invalid username or password");
			}
			const token = await authService.generateAccessTokenS(
				user.id,
				user.username,
			);
			return ctx.json({
				success: true,
				token,
			});
		} catch (error: any) {
			console.log(error);
			return ctx.json({
				success: false,
			});
		}
	};

	public me = async (ctx: Context) => {
		try {
			const username = ctx.req.header("user_name") as string;
			const user = await this.meS(username);
			return ctx.json({
				success: true,
				user,
			});
		} catch (error: any) {
			console.log(error);
			return ctx.json({
				success: false,
			});
		}
	};
}
