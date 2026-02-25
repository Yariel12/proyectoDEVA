import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import AuthRoutes from "../src/routes/auth.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import ProductsRoutes from "./routes/products.routes.js";
import InvetoryMovements from "./routes/inventoryMovement.routes.js";
import providerRoutes from "./routes/provider.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Ferretería funcionando");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/category", CategoryRouter);
app.use("/api/products", ProductsRoutes);
app.use("/api/inventory", InvetoryMovements);
app.use("/api/providers", providerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
