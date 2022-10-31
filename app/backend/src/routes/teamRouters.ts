import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';

const teamController = new TeamController();
const teamsRouter = Router();

teamsRouter.get('/teams', teamController.getAllTeams );

export { teamsRouter };