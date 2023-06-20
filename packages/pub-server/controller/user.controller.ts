import { Response, Request } from "express";
import UserService from '../services/users.service'

export default class UserController extends UserService {
    public getAllUsers = (_req: Request, res: Response) => {
        try{
            const users = this.getUsersS()
            res.json(users)
        }
        catch(e: any){
            console.log(e);
            res.send({
                success: false
            })
        }
    }

    public getUser = (req: Request, res: Response) => {
        try{
            const user = this.getUserS(req.params.username)
            res.json(user)
        }
        catch(e: any){
            console.log(e);
            res.send({
                success: false
            })
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try{
            const result = await this.createUserS(req.body.username, req.body.password, req.body.email)
            res.json(result)
        }
        catch(e: any){
            console.log(e);
            res.send({
                success: false
            })
        }
    }

    public updateUser = (req: Request, res: Response) => {
        try{
            this.updateUserS(req.params.username, req.body)
            res.json({ success: true })
        }
        catch(e: any){
            console.log(e);
            res.send({
                success: false
            })
        }
    }
};