import { Router } from 'express';

import UserController from '../controller/user.controller';
import AuthService from '../services/auth.service';

const authService = new AuthService();

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/me', authService.mid() as any , userController.me);
router.get('/:username', userController.getUser);
router.patch('/', userController.updateUser);
router.post('/login', userController.loginUser);

console.log('Loaded User Routes Successfully!');

export default router;