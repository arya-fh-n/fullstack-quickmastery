import express from "express";
import productRouter from "./products/product.router.js";
import categoriesRouter from "./categories/categories.router.js";
import cartRouter from "./cart/cart.router.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";

/** Init router **/
const router = express.Router();

/** Define routes **/
router.use("/products", productRouter);
router.use("/categories", categoriesRouter);
router.use("/user/cart", cartRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
