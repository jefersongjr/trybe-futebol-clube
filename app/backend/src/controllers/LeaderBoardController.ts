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

public getAwayLeader = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const awayMatchs = await this.leaderBoardService.getLeaderAway();
    return res.status(200).json(awayMatchs);  
    } catch (error) {
       next(error) ;
    }
}

public getLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const allMatchs = await this.leaderBoardService.getLeader();
    return res.status(200).json(allMatchs);  
    } catch (error) {
       next(error) ;
    }
}
}
