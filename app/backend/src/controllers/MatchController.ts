import { Request, Response, NextFunction, response } from "express";
import { MatchService } from '../services/MatchService';


export class MatchController {
    private MatchService : MatchService;

    constructor() {
        this.MatchService = new MatchService();
    }
    
    public getMatchByTherm = async (req: Request, res: Response, next: NextFunction) => {  
        const {inProgress} = req.query 
        console.log(inProgress)
        const Response = await this.MatchService.getMatches(inProgress);
        return res.status(200).json(Response);  
    }
}
