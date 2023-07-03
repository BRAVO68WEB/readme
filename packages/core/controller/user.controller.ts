import { Context } from 'hono';

import UserService from '../services/users.service';

export default class UserController extends UserService {
    public getAllUsers = (ctx: Context) => {
        try{
            const users = this.getUsersS();
            return ctx.json(users);
        }
        catch(error: any){
            console.log(error);
            return ctx.json({
                success: false
            });
        }
    };

    public getUser = (ctx: Context) => {
        try{
            const username = ctx.req.param('username');
            const user = this.getUserS(username);
            return ctx.json(user);
        }
        catch(error: any){
            console.log(error);
            return ctx.json({
                success: false
            });
        }
    };

    public createUser = async (ctx: Context) => {
        try{
            const { username, password, email } = await ctx.req.json();
            const ctxult = await this.createUserS(
                username,
                password,
                email
            );
            return ctx.json(ctxult);
        }
        catch(error: any){
            console.log(error);
            return ctx.json({
                success: false
            });
        }
    };

    public updateUser = (ctx: Context) => {
        try{
            const username = ctx.req.param('username');
            const body = ctx.req.json();
            this.updateUserS(username, body);
            return ctx.json({ success: true });
        }
        catch(error: any){
            console.log(error);
            return ctx.json({
                success: false
            });
        }
    };
}