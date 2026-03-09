import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const ordersRoutes = express.Router();

ordersRoutes.post("/create", protect, createOrder);
ordersRoutes.get("/get", protect, getOrders);
ordersRoutes.get("/get/:id", protect, getOrderById);
ordersRoutes.patch("/update/:id/status", protect, updateOrderStatus);

export default ordersRoutes;
