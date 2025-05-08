import express from "express";
import ForumsController from "../controllers/forums.controller.js";
import { authenticateToken, authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// User + Admin
router.get("/", ForumsController.getForumList);
router.get("/nested/:id", ForumsController.getForumDetail);
router.post("/", ForumsController.createNewForum);
router.post("/", ForumsController.commentOnForum);

// Admin Only
router.get("/admin", authenticateAdmin, ForumsController.getForumListAdmin);
router.put("/:id", authenticateAdmin, ForumsController.updatePostStatus);

export default router;
