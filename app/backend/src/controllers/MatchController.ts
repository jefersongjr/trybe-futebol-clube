import { Request, Response, NextFunction } from "express";
import { MatchService } from '../services/MatchService';


export class MatchController {
    private MatchService : MatchService;

    constructor() {
        this.MatchService = new MatchService();
    }

    public getAllMatches = async (req: Request, res: Response, next: NextFunction) => {   
        const matches = await this.MatchService.getMatches();
        return res.status(200).json(matches);  
    }
}
