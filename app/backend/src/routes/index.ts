import { Application } from "express";
import { userRouter } from "./userRouter";

export default (app: Application) => {
    app.use(userRouter);
}