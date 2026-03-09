import express from "express";
import {
  createInventoryMovement,
  getInventoryMovements,
  getMovementsByProduct,
} from "../controllers/inventoryMovement.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const invetoryMovements = express.Router();

invetoryMovements.post(
  "/Add/Stock/Products",
  protect,
  adminOnly,
  createInventoryMovement,
);
invetoryMovements.get(
  "/Get/Movements/history",
  protect,
  adminOnly,
  getInventoryMovements,
);
invetoryMovements.get(
  "/movements/product/:id",
  protect,
  adminOnly,
  getMovementsByProduct,
);

export default invetoryMovements;
