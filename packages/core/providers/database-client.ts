/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Database } from "better-sqlite3";
import Datebase from "better-sqlite3";

export class DBClient {
	private db: Database;

	constructor() {
		this.db = new Datebase("data/data.sqlite", { verbose: console.log });
	}

	public init() {
		this.db
			.prepare(
				"CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE, hash TEXT, salt TEXT, email TEXT UNIQUE, created_at DATE, updated_at DATE)",
			)
			.run();

		this.db
			.prepare(
				"CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, title TEXT, content TEXT, tags TEXT, author_id TEXT REFERENCES users(id), created_at DATE, updated_at DATE)",
			)
			.run();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public createUser(
		id: string,
		username: string,
		email: string,
		hash: string,
		salt: string,
	) {
		return this.db
			.prepare(
				"INSERT INTO users (id, username, hash, salt, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
			)
			.run(
				id,
				username,
				hash,
				salt,
				email,
				new Date().toISOString(),
				new Date().toISOString(),
			);
	}

	public getUser(username: string, extraInfo: string[] = []) {
		const toShow = ["id", "username", "email", "created_at", "updated_at"];
		if (extraInfo.length > 0) {
			toShow.push(...extraInfo);
		}
		const result = this.db
			.prepare(
				`SELECT ${toShow.join(", ")} FROM users WHERE username = ?`,
			)
			.get(username);
		if (result) {
			return result;
		}
		return null;
	}

	public getUsers() {
		const toShow = ["id", "username", "email", "created_at", "updated_at"];
		return this.db.prepare(`SELECT ${toShow.join(", ")} FROM users`).all();
	}

	public updateUser(username: string, updateContent: any) {
		const keys = Object.keys(updateContent);
		const values = Object.values(updateContent);
		const updateString = keys.map((key) => `${key} = ?`).join(", ");
		const updateValues = [...values, new Date().toISOString()];
		this.db
			.prepare(`UPDATE users SET ${updateString} WHERE username = ?`)
			.run(...updateValues, username);
	}

	public createPost(
		id: string,
		title: string,
		content: string,
		tags: string[],
		author_id: string,
	) {
		console.log(id, title, content, tags, author_id);
		return this.db
			.prepare(
				"INSERT INTO posts (id, title, content, tags, author_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
			)
			.run(
				id,
				title,
				content,
				JSON.stringify(tags),
				author_id,
				new Date().toISOString(),
				new Date().toISOString(),
			);
	}

	public getPost(id: string, extraInfo: string[] = []) {
		const toShow = ["id", "title", "content", "tags", "author_id", "created_at", "updated_at"];
		if (extraInfo.length > 0) {
			toShow.push(...extraInfo);
		}
		const result: any = this.db
			.prepare(
				`SELECT ${toShow.join(", ")} FROM posts WHERE id = ?`,
			)
			.get(id);
		if (result) {
			return {
				...result,
				tags: JSON.parse(result.tags),				
			};
		}
		return null;
	}

	public getPosts() {
		const toShow = ["id", "title", "content", "tags", "author_id", "created_at", "updated_at"];
		const result: any = this.db.prepare(`SELECT ${toShow.join(", ")} FROM posts`).all();

		return result.map((post: any) => ({
			...post,
			tags: JSON.parse(post.tags)
		}))
	}

	public updatePost(id: string, updateContent: any) {
		console.log(updateContent);
		const keys = Object.keys(updateContent);
		const values = Object.values(updateContent);
		const updateString = keys.map((key) => `${key} = ?`).join(", ");
		const updateValues = [...values];
		console.log(`UPDATE posts SET ${updateString} WHERE id = ?`, updateValues);
		return this.db
			.prepare(`UPDATE posts SET ${updateString} WHERE id = ?`)
			.run(...updateValues, id);
	}

	public deletePost(id: string) {
		return this.db
			.prepare(`DELETE FROM posts WHERE id = ?`)
			.run(id);
	}
}

export default new DBClient();
