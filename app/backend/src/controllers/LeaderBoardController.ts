import { Request, Response, NextFunction } from "express";
import { LeaderBoardService } from '../services/LeaderBoardService';


export class LeaderBoardController {
    private leaderBoardService : LeaderBoardService;

    constructor() {
        this.leaderBoardService = new LeaderBoardService();
    }

    public getHomeLeader = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const homeMatchs = await this.leaderBoardService.getLeaderHome();
        return res.status(200).json(homeMatchs);  
        } catch (error) {
           next(error) ;
        }
}
}
