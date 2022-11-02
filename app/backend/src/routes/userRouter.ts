import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authValidate'

const userController = new UserController();
const userRouter = Router();

userRouter.post('/login', userController.getLogin);
userRouter.get('/login/validate', authMiddleware, userController.validateLogin );


export { userRouter };