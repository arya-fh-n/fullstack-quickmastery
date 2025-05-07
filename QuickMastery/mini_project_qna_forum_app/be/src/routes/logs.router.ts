import express from "express";
import LogsController from "../controllers/logs.controller.js";
import { authenticateToken } from "src/middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken)

router.get("/", LogsController.getLog);
router.post("/", LogsController.createLog);
router.post("/admin", LogsController.getLogAdmin);

export default router;
