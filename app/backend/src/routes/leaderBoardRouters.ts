import { Router } from 'express';
import { LeaderBoardController } from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();
const leaderBoardRouter = Router();

leaderBoardRouter.get('/leaderboard', leaderBoardController.getLeaderBoard);
leaderBoardRouter.get('/leaderboard/home', leaderBoardController.getHomeLeader);
leaderBoardRouter.get('/leaderboard/away', leaderBoardController.getAwayLeader);


export { leaderBoardRouter };