import express from "express";
import productRouter from "./products/product.router.js";
/** Init router **/
const router = express.Router();
/** Define routes **/
router.use("/products", productRouter);
export default router;
