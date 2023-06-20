import DBClient from '../providers/database-client';
import { fetchForActor } from '../utils/actor-fetch-key';
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

    public async getUserS(username: string){
        const result = await this.db.getUser(username);
        const userKeys = await fetchForActor(username);
        return {
            ...result,
            keys: userKeys
        };
    }

    public getUsersS(){
        return this.db.getUsers();
    }
}