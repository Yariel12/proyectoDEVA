import express from "express";
import {
  createInventoryMovement,
  getInventoryMovements,
  getMovementsByProduct,
} from "../controllers/inventoryMovement.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const InvetoryMovements = express.Router();

InvetoryMovements.post(
  "/AddInvetoryProducts",
  protect,
  adminOnly,
  createInventoryMovement,
);
InvetoryMovements.get(
  "/GetMovementsInvetory",
  protect,
  adminOnly,
  getInventoryMovements,
);
InvetoryMovements.get(
  "/AllProducts/:productId",
  protect,
  adminOnly,
  getMovementsByProduct,
);

export default InvetoryMovements;
