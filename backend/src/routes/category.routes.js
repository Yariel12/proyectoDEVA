import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  desactivateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/createCategory", protect, adminOnly, createCategory);
categoryRouter.get("/getAllCategory", getCategories);
categoryRouter.get("/getById/:id", getCategoryById);
categoryRouter.put(
  "/UpdateCategoryById/:id",
  protect,
  adminOnly,
  updateCategory,
);
categoryRouter.delete("/delete/:id", protect, adminOnly, deleteCategory);
categoryRouter.delete(
  "/desactivate/:id",
  protect,
  adminOnly,
  desactivateCategory,
);

export default categoryRouter;
