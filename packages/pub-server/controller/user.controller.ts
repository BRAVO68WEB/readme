import type { Request,Response } from 'express';

import UserService from '../services/users.service';

export default class UserController extends UserService {
    public getAllUsers = (_req: Request, res: Response) => {
        try{
            const users = this.getUsersS();
            res.json(users);
        }
        catch(error: any){
            console.log(error);
            res.send({
                success: false
            });
        }
    };

    public getUser = async (req: Request, res: Response) => {
        try{
            const user = await this.getUserS(req.params.username);
            res.json(user);
        }
        catch(error: any){
            console.log(error);
            res.send({
                success: false
            });
        }
    };

    public createUser = async (req: Request, res: Response) => {
        try{
            const { username, password, email } = req.body as { username: string, password: string, email: string };
            const result = await this.createUserS(
                username,
                password,
                email
            );
            res.json(result);
        }
        catch(error: any){
            console.log(error);
            res.send({
                success: false
            });
        }
    };

    public updateUser = (req: Request, res: Response) => {
        try{
            this.updateUserS(req.params.username, req.body);
            res.json({ success: true });
        }
        catch(error: any){
            console.log(error);
            res.send({
                success: false
            });
        }
    };
}