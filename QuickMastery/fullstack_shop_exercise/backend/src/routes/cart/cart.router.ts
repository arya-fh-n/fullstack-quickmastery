import express from "express";
import CartController from "../../controllers/cart.controller.js";

const router = express.Router();

router.get("/:id", CartController.getById);
router.post("/:id", CartController.create);
router.put("/:id", CartController.update);
router.delete("/:id", CartController.delete);

export default router;