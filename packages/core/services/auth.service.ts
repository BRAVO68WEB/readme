import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";

import { serverPrivateKey, serverPublicKey } from "../utils/read-server-keys";

interface IAccessToken {
	id: string;
	username: string;
	token_type: "access_token";
}

export default class AuthService {
	public async generateAccessTokenS(id: string, username: string) {
		const privateKey = await serverPrivateKey();
		return jwt.sign(
			{
				id,
				username,
				token_type: "access_token",
			},
			privateKey,
			{
				algorithm: "RS256",
				expiresIn: "15d",
			},
		);
	}

	public async verifyAccessTokenS(token: string) {
		const publicKey = await serverPublicKey();
		const decoded = (await jwt.verify(token, publicKey, {
			algorithms: ["RS256"],
		})) as IAccessToken;
		if (decoded.token_type === "access_token") {
			return decoded;
		}
		return null;
	}

	public async generateTokensS(id: string, username: string) {
		const accessToken = await this.generateAccessTokenS(id, username);
		return {
			accessToken,
		};
	}

	public mid() {
		return async (ctx: Context, next: Next) => {
			const authHeader = ctx.req.header("Authorization");
			if (authHeader) {
				const token = authHeader.split(" ")[1];
				const decoded = await this.verifyAccessTokenS(token);
				if (decoded) {
					const headers = ctx.req.headers;
					headers.append("user_name", decoded.username);
					headers.append("user_id", decoded.id);
					headers.append("user_token_type", decoded.token_type);
					return next();
				} else {
					return ctx.json({
						error: "Invalid token",
					});
				}
			} else {
				return ctx.json({
					error: "No token",
				});
			}
		};
	}
}
