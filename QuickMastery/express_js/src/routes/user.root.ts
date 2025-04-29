import express from "express";
import UserController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/users", UserController.getAll);
userRouter.get("/user/:id", UserController.getOne);
userRouter.put("/user/:id", UserController.updateOne);
userRouter.post("/user", UserController.createOne);
userRouter.delete("/user/:id", UserController.deleteOne);

export default userRouter;
