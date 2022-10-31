import { Request, Response, NextFunction } from "express";
import { TeamService } from '../services/TeamService';

export class TeamController {
    private teamService : TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    public getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
        const teams = await this.teamService.getTeams();
        return res.status(200).json(teams);  
    }

      public getTeamById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const team = await this.teamService.getById(id);
        return res.status(200).json(team);  
    }
}