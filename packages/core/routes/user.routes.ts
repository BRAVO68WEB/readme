import { Hono } from 'hono';
import UserController from '../controller/user.controller';

const user = new Hono();
const userController = new UserController();

user.get('/', userController.getAllUsers);
user.get('/:username', userController.getUser);
user.post('/', userController.createUser);
user.patch('/', userController.updateUser);

console.log('↗️, Loaded User Routes!');

export {user};