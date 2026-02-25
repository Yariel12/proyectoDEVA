import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import Router from "express";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";

const ProductsRoutes = Router();

ProductsRoutes.post("/createProducts", protect, adminOnly, createProduct);
ProductsRoutes.get("/getAllProducts", protect, getProducts);
ProductsRoutes.get("/getByIdProduct/:id", getProductById);
ProductsRoutes.put("/updateProduct/:id", protect, updateProduct);
ProductsRoutes.delete("/deleteProduct/:id", protect, adminOnly, deleteProduct);

export default ProductsRoutes;
