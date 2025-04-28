import express from "express";
import userRouter from "./user.root";

const router = express.Router();

router.use("/v2", userRouter);

export default router;