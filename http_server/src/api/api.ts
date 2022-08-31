import * as express from "express";

import UserRouter from './user';

let router = express.Router();

router.use("/user", UserRouter);

export default router;