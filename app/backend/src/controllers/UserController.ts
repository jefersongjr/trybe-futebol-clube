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
    public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const token = req.headers.authorization;
        const x = await this.userService.getLoginValidate(token);
        const {role} = x.payload
        console.log(role)
        return res.status(200).json({ role: role });  
        } catch (error) {
           next(error) ;
        }
}
}
