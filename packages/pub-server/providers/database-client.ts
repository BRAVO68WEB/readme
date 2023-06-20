import Datebase, { Database } from "better-sqlite3"

export class DBClient {
    private db: Database
    
    constructor(){
        this.db = new Datebase("data/data.sqlite", { verbose: console.log });
    }

    public init(){
        this.db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, created_at DATE, updated_at DATE)").run()
    }

    public createUser(username: string, password: string, email: string){
        this.db.prepare("INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").run(username, password, email, new Date().toISOString(), new Date().toISOString())
    }

    public getUser(username: string){
        const toShow = ["id", "username", "email", "created_at", "updated_at"]
        const result = this.db.prepare(`SELECT ${toShow.join(", ")} FROM users WHERE username = ?`).get(username)
        if(result){
            return result
        }
        return null
    }

    public getUsers(){
        const toShow = ["id", "username", "email", "created_at", "updated_at"]
        const result = this.db.prepare(`SELECT ${toShow.join(", ")} FROM users`).all()
        return result
    }

    public updateUser(username: string, updateContent: any){
        const keys = Object.keys(updateContent)
        const values = Object.values(updateContent)
        const updateString = keys.map((key) => `${key} = ?`).join(", ")
        const updateValues = values.concat(new Date().toISOString())
        this.db.prepare(`UPDATE users SET ${updateString} WHERE username = ?`).run(...updateValues, username)
    }
}

export default new DBClient()