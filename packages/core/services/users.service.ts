import DBClient from '../providers/database-client';
import { genForActor } from '../utils/actor-gen-key';

export default class UserService {
    private db = DBClient;

    public async createUserS(username: string, password: string, email: string){
        await this.db.createUser(username, password, email);
        const result = await this.db.getUser(username);
        const userKeys = await genForActor(username);
        return {
            ...result,
            keys: userKeys
        };
    }

    public updateUserS(username: string, updateContent: any){
        this.db.updateUser(username, updateContent);
    }

    public getUserS(username: string){
        return this.db.getUser(username);
    }

    public getUsersS(){
        return this.db.getUsers();
    }
}