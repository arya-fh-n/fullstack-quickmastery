"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = express_1.default.Router();
userRouter.get("/users", user_controller_1.default.getAll);
userRouter.get("/user/:id", user_controller_1.default.getOne);
userRouter.put("/user/:id", user_controller_1.default.updateOne);
userRouter.post("/user", user_controller_1.default.createOne);
userRouter.delete("/user/:id", user_controller_1.default.deleteOne);
exports.default = userRouter;
