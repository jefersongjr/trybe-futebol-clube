import { Router } from 'express';

const userRouter = Router();

userRouter.post('/login', (req, res) => {
    res.status(200).json({ message: 'ok'})
});

export { userRouter };