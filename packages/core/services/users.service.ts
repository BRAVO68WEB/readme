import crypto from "node:crypto";

import DBClient from "../providers/database-client";
import { fetchForActor, genForActor, genNewSnowflakeId  } from "../utils";

export default class UserService {
	private db = DBClient;

	public async createUserS(
		username: string,
		password: string,
		email: string,
	) {
		const id = genNewSnowflakeId();
		const salt = crypto.randomBytes(16).toString("hex");
		const hash = crypto
			.pbkdf2Sync(password, salt, 1000, 64, "sha512")
			.toString("hex");
		this.db.createUser(id, username, email, hash, salt);
		const result = await this.db.getUser(username);
		const userKeys = await genForActor(username);
		return {
			...result,
			keys: userKeys,
		};
	}

	public updateUserS(username: string, updateContent: any) {
		this.db.updateUser(username, updateContent);
	}

	public async getUserS(username: string) {
		const result = await this.db.getUser(username);
		const userKeys = await fetchForActor(username);
		return {
			...result,
			keys: userKeys,
		};
	}

	public getUsersS() {
		return this.db.getUsers();
	}

	public async loginUserS(username: string, password: string) {
		const result = (await this.db.getUser(username, ["hash", "salt"])) as {
			salt: string;
			hash: string;
		};
		if (result) {
			const hash = crypto
				.pbkdf2Sync(password, result.salt, 1000, 64, "sha512")
				.toString("hex");
			if (hash === result.hash) {
				const userKeys = await fetchForActor(username);
				return {
					...result,
					keys: userKeys,
				};
			}
		}
		return null;
	}

	public async meS(username: string) {
		const data = await this.getUserS(username);
		if (data) {
			return data;
		}
		return null;
	}
}
