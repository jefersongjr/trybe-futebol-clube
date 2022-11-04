import { Router } from 'express';
import { authMiddleware } from '../middlewares/authValidate';
import { MatchController } from '../controllers/MatchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.post('/matches',authMiddleware, matchController.addNewMatch);
matchRouter.get('/matches', matchController.getMatchByTherm);
matchRouter.patch('/matches/:id', matchController.changeMatch);
matchRouter.patch('/matches/:id/finish',authMiddleware, matchController.changeStatus);



export { matchRouter };