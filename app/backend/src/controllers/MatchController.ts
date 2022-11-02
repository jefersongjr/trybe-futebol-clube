import { Request, Response, NextFunction, response } from "express";
import { MatchService } from '../services/MatchService';


export class MatchController {
    private MatchService : MatchService;

    constructor() {
        this.MatchService = new MatchService();
    }

    public getMatchByTherm = async (req: Request, res: Response, next: NextFunction) => {  
        const {inProgress} = req.query 
        const Response = await this.MatchService.getMatches(inProgress);
        return res.status(200).json(Response);  
    }

    public addNewMatch = async (req: Request, res: Response, next: NextFunction) => {  
        try {
            const {homeTeam , awayTeam ,homeTeamGoals , awayTeamGoals } = req.body;
            const newMatch = await this.MatchService.addMatch(homeTeam , awayTeam ,homeTeamGoals , awayTeamGoals);
            return res.status(201).json(newMatch); 
        } catch (error) {
            next(error);
        } 
    }

    public changeStatus = async (req: Request, res: Response, next: NextFunction) => {  
        try {
            const { id } = req.params;
            await this.MatchService.changeProgress(parseInt(id));
            return res.status(200).json({message: 'Finished'}); 
        } catch (error) {
            next(error);
        } 
    }

}
