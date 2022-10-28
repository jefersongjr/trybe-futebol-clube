import { Request, Response, NextFunction } from "express";
import { UserService } from '../services/UserService';


export class UserController {
    private userService : UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { email, password } = req.body;
      
        const token = await this.userService.getLogin(email, password);
        return res.status(200).json({ token: token });  
        } catch (error) {
           next(error) ;
        }
    }
}