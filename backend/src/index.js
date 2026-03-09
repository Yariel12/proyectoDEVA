import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import ProductsRoutes from "./routes/products.routes.js";
import invetoryMovements from "./routes/inventoryMovement.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import ordersRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", () => {
  res.send("API Ferretería funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/products", ProductsRoutes);
app.use("/api/inventory", invetoryMovements);
app.use("/api/providers", providerRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
