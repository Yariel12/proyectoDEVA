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

const CategoryRouter = express.Router();

CategoryRouter.post("/createCategory", protect, adminOnly, createCategory);
CategoryRouter.get("/getAllCategory", getCategories);
CategoryRouter.get("/getById/:id", getCategoryById);
CategoryRouter.put(
  "/UpdateCategoryById/:id",
  protect,
  adminOnly,
  updateCategory,
);
CategoryRouter.delete("/delete/:id", protect, adminOnly, deleteCategory);
CategoryRouter.delete(
  "/desactivate/:id",
  protect,
  adminOnly,
  desactivateCategory,
);

export default CategoryRouter;
