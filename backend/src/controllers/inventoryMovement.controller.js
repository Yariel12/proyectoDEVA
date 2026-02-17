import InventoryMovement from "../models/InventoryMovement.model.js";
import ProductModel from "../models/product.model.js";

export const createInventoryMovement = async (req, res) => {
  try {
    const { product, direction, reason, quantity, note } = req.body;

    if (!product || !direction || !reason || !quantity) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "La cantidad debe ser mayor que 0",
      });
    }

    const existingProduct = await ProductModel.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const previousStock = existingProduct.stock;

    // 🔥 Lógica de inventario
    if (direction === "in") {
      existingProduct.stock += quantity;
    }

    if (direction === "out") {
      if (existingProduct.stock < quantity) {
        return res.status(400).json({
          message: "Stock insuficiente",
        });
      }

      existingProduct.stock -= quantity;
    }

    const newStock = existingProduct.stock;

    await existingProduct.save();

    const movement = await InventoryMovement.create({
      product,
      direction,
      reason,
      quantity,
      note,
      previousStock,
      newStock,
      createdBy: req.user.id, // según tu middleware
    });

    res.status(201).json({
      message: "Movimiento registrado correctamente",
      movement,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInventoryMovements = async (req, res) => {
  try {
    const movements = await InventoryMovement.find()
      .populate("product", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(movements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMovementsByProduct = async (req, res) => {
  try {
    const movements = await InventoryMovement.find({
      product: req.params.productId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(movements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

