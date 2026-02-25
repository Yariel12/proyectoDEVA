import express from "express";
import {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} from "../controllers/provider.controller.js";

const providerRoutes = express.Router();

providerRoutes.post("/create", createProvider);
providerRoutes.get("/get", getProviders);
providerRoutes.get("/getById/:id", getProviderById);
providerRoutes.put("/Update/:id", updateProvider);
providerRoutes.delete("/delete/:id", deleteProvider);

export default providerRoutes;
