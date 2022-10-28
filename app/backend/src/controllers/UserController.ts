import { Request, Response, NextFunction } from "express";
import { UserService } from '../services/UserService';

const userService = new UserService()

export class UserController {
    public getLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { email, password } = req.body;
      
        const token = await userService.getLogin(email, password);
        return res.status(200).json({ token: token });  
        } catch (error) {
           next(error) ;
        }
    }
}