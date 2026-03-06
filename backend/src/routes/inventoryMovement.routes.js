import express from "express";
import {
  createInventoryMovement,
  getInventoryMovements,
  getMovementsByProduct,
} from "../controllers/inventoryMovement.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const InvetoryMovements = express.Router();

InvetoryMovements.post(
  "/Add/Stock/Products",
  protect,
  adminOnly,
  createInventoryMovement,
);
InvetoryMovements.get(
  "/Get/Movements/history",
  protect,
  adminOnly,
  getInventoryMovements,
);
InvetoryMovements.get(
  "/movements/product/:id",
  protect,
  adminOnly,
  getMovementsByProduct,
);

export default InvetoryMovements;
