import { Router } from "express";
import {
  createAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/address.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const addressRoutes = Router();

addressRoutes.post("/create", protect, createAddress);
addressRoutes.get("/get", protect, getMyAddresses);
addressRoutes.put("/update/:id", protect, updateAddress);
addressRoutes.delete("/delete/:id", protect, deleteAddress);
addressRoutes.patch("/default/:id", protect, setDefaultAddress);

export default addressRoutes;
