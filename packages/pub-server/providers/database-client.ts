/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Database } from 'better-sqlite3';
import Datebase from 'better-sqlite3';

export class DBClient {
    private db: Database;
    
    constructor(){
        this.db = new Datebase('data/data.sqlite', { verbose: console.log });
    }

    public init(){
        this.db.prepare('CREATE TABLE IF NOT EXISTS users (id BIGINT PRIMARY KEY, username TEXT UNIQUE, hash TEXT, salt TEXT, email TEXT UNIQUE, created_at DATE, updated_at DATE)').run();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public createUser(id: string, username: string, email: string, hash: string, salt: string){
        this.db.prepare('INSERT INTO users (id, username, hash, salt, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(id, username, hash, salt, email, new Date().toISOString(), new Date().toISOString());
    }

    public getUser(username: string, extraInfo: string[] = []){
        const toShow = ['id', 'username', 'email', 'created_at', 'updated_at'];
        if(extraInfo.length > 0){
            toShow.push(...extraInfo);
        }
        const result = this.db.prepare(`SELECT ${toShow.join(', ')} FROM users WHERE username = ?`).get(username);
        if(result){
            return result;
        }
        return null;
    }

    public getUsers(){
        const toShow = ['id', 'username', 'email', 'created_at', 'updated_at'];
        return this.db.prepare(`SELECT ${toShow.join(', ')} FROM users`).all();
    }

    public updateUser(username: string, updateContent: any){
        const keys = Object.keys(updateContent);
        const values = Object.values(updateContent);
        const updateString = keys.map((key) => `${key} = ?`).join(', ');
        const updateValues = [...values, new Date().toISOString()];
        this.db.prepare(`UPDATE users SET ${updateString} WHERE username = ?`).run(...updateValues, username);
    }
}

export default new DBClient();