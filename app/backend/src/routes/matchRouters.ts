import { Router } from 'express';
import { MatchController } from '../controllers/MatchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/matches', matchController.getMatchByTherm);


export { matchRouter };