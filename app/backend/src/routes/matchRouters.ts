import { Router } from 'express';
import { authMiddleware } from '../middlewares/authValidate';
import { MatchController } from '../controllers/MatchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/matches', matchController.getMatchByTherm);
matchRouter.post('/matches',authMiddleware, matchController.addNewMatch);
matchRouter.patch('/matches/:id/finish', matchController.changeStatus);




export { matchRouter };