import crypto from 'node:crypto';

import DBClient from '../providers/database-client';
import { fetchForActor } from '../utils/actor-fetch-key';
import { genForActor } from '../utils/actor-gen-key';

export default class UserService {
    private db = DBClient;

    public async createUserS(username: string, password: string, email: string){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        await this.db.createUser(username, email, hash, salt);
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

    public async loginUserS(username: string, password: string){
        const result = await this.db.getUser(username, ['hash', 'salt']) as {
            salt: string;
            hash: string;
        };
        if(result){
            const hash = crypto.pbkdf2Sync(password, result.salt, 1000, 64, 'sha512').toString('hex');
            if(hash === result.hash){
                const userKeys = await fetchForActor(username);
                return {
                    ...result,
                    keys: userKeys
                };
            }
        }
        return null;
    }
}