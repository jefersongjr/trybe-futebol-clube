import { Router } from 'express';
import { LeaderBoardController } from '../controllers/LeaderBoardController';
import { authMiddleware } from '../middlewares/authValidate'

const leaderBoardController = new LeaderBoardController();
const leaderBoardRouter = Router();

leaderBoardRouter.get('/leaderboard/home', leaderBoardController.getHomeLeader);
leaderBoardRouter.get('/leaderboard/away', leaderBoardController.getAwayLeader);


export { leaderBoardRouter };