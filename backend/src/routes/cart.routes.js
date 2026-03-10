import express from "express";
import { addToCart, getMyCart } from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get", protect, getMyCart);
router.post("/add", protect, addToCart);

export default router;
