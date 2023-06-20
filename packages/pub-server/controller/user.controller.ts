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

    public loginUser = async (req: Request, res: Response) => {
        try{
            const user = await this.loginUserS(req.body.username, req.body.password);
            if(!user){
                throw new Error('Invalid username or password');
            }
            res.json({
                success: true,
                user
            });
        }
        catch(error: any){
            console.log(error);
            res.send({
                success: false
            });
        }
    };
}